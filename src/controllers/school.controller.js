import pool from '../config/db.js';

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400)
    .json({ error: 'All fields are required' });
  }
  if (typeof name !== 'string' || typeof address !== 'string') {
    return res.status(400)
    .json({ error: 'Name and address must be strings' });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400)
    .json({ error: 'Latitude and longitude must be numbers' });
  }
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400)
    .json({ error: 'Invalid coordinates range' });
  }

  try {
    await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201)
    .json({ message: 'School added successfully' });
  } catch (err) {
    res.status(500)
    .json({ error: 'Database error', details: err.message });
  }
};

export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'latitude and longitude are required' });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'latitude and longitude must be numbers' });
  }

  try {
    const [schools] = await pool.query('SELECT * FROM schools');
    const sorted = schools
      .map(school => ({
        ...school,
        distance: getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        )
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200)
    .json({ schools: sorted });
  } catch (err) {
    res.status(500)
    .json({ error: 'Database error', details: err.message });
  }
};