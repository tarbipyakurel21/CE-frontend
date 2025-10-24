-- Seed Mississippi courses
INSERT INTO courses (title, description, state_code, hours, price, topics, is_bestseller) VALUES
(
  'Mississippi 2 Hour Project Management',
  'This course has been approved by the Mississippi State Board of Contractors for 2 hours of continuing education credit.',
  'MS',
  2,
  29.00,
  ARRAY['Purpose of project management', 'Project management concerns', 'Useful systems for project management'],
  true
),
(
  'Mississippi 2 Hour Roofing & Repair',
  'This course has been approved by the Mississippi State Board of Contractors for 2 hours of continuing education credit.',
  'MS',
  2,
  29.00,
  ARRAY['Sources of damage', 'Leaks', 'Intensive care'],
  false
),
(
  'Mississippi 4 Hour Business Management',
  'This course covers essential business management topics for contractors including financial planning, contracts, and risk management.',
  'MS',
  4,
  49.00,
  ARRAY['Financial planning', 'Contract management', 'Risk assessment', 'Business operations'],
  false
);

-- Seed Alabama courses
INSERT INTO courses (title, description, state_code, hours, price, topics, is_bestseller) VALUES
(
  'Alabama 6 Hour Contractor Continuing Education',
  'Complete your Alabama contractor license renewal requirements with this comprehensive 6-hour course.',
  'AL',
  6,
  59.00,
  ARRAY['Building codes', 'Safety regulations', 'Contract law', 'Business practices'],
  true
),
(
  'Alabama 3 Hour Ethics & Professionalism',
  'Learn about professional ethics and standards for contractors in Alabama.',
  'AL',
  3,
  39.00,
  ARRAY['Professional ethics', 'Industry standards', 'Legal responsibilities'],
  false
);
