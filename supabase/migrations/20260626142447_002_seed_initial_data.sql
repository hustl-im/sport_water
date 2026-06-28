/*
# Seed initial data for Sport Water

1. Inserts default products (600ml and 2000ml bottles)
2. Seeds FAQ entries
3. Seeds testimonials
4. Seeds gallery placeholders
5. Seeds default settings
6. Seeds inventory records
*/

INSERT INTO products (name, description, size_ml, price_etb, image_url, stock, rating, reviews_count, is_active)
VALUES
  ('Sport Water 600ml', 'Premium purified drinking water in a convenient 600ml bottle. Perfect for athletes, gym sessions, and on-the-go hydration.', 600, 30.00, '/images/bottle-600ml.png', 500, 4.8, 124, true),
  ('Sport Water 2000ml', 'Large 2-liter bottle of premium purified drinking water. Ideal for families, offices, schools, and extended hydration needs.', 2000, 70.00, '/images/bottle-2000ml.png', 300, 4.9, 89, true)
ON CONFLICT DO NOTHING;

INSERT INTO faq (question, answer, display_order)
VALUES
  ('What makes Sport Water different from other bottled water?', 'Sport Water undergoes a rigorous 7-step purification process including reverse osmosis, UV sterilization, and mineral enhancement. Our water is sourced from pristine Ethiopian highlands and bottled under strict quality controls.', 1),
  ('Do you offer delivery services?', 'Yes! We offer fast delivery across Addis Ababa and surrounding areas. Orders placed before 2 PM are delivered the same day. Bulk orders for offices and schools receive priority scheduling.', 2),
  ('What sizes are available?', 'We currently offer two sizes: 600ml (perfect for individual use and sports) and 2000ml (ideal for families and offices). Both sizes are available in single bottles and bulk packs.', 3),
  ('Is your packaging eco-friendly?', 'Absolutely. Our bottles are made from 100% recyclable PET plastic. We are committed to reducing our environmental footprint and encourage customers to recycle their bottles.', 4),
  ('How do I place a bulk order for my office or school?', 'Simply fill out the contact form or call us directly at 0926549254. We offer special pricing for bulk orders and can set up recurring delivery schedules.', 5),
  ('What is your refund policy?', 'If you are not satisfied with the quality of our water, we offer a full refund or replacement within 7 days of delivery. Your satisfaction is our top priority.', 6)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, role, content, rating)
VALUES
  ('Abebe Kebede', 'Professional Athlete', 'Sport Water has been my go-to hydration choice for training and competitions. The taste is clean and refreshing, and the 600ml size is perfect for my gym bag.', 5),
  ('Fatuma Ahmed', 'Office Manager', 'We switched to Sport Water for our entire office of 50 employees. The 2-liter bottles are economical and the delivery service is incredibly reliable. Highly recommended!', 5),
  ('Dawit Mengistu', 'Fitness Coach', 'I recommend Sport Water to all my clients. The quality is consistent and you can truly taste the difference. It is the best bottled water in Ethiopia.', 5),
  ('Hiwot Tadesse', 'School Principal', 'Our students love Sport Water! The bulk delivery option makes it easy to keep our cafeteria stocked. Great product and even better customer service.', 4),
  ('Yonas Girma', 'Marathon Runner', 'During my last marathon, Sport Water kept me hydrated from start to finish. The purity makes a real difference in performance. I will not run with anything else.', 5)
ON CONFLICT DO NOTHING;

INSERT INTO gallery (title, image_url, category, display_order)
VALUES
  ('Purification Process', '/images/gallery-1.jpg', 'process', 1),
  ('Bottling Line', '/images/gallery-2.jpg', 'facility', 2),
  ('Quality Testing', '/images/gallery-3.jpg', 'process', 3),
  ('Delivery Fleet', '/images/gallery-4.jpg', 'delivery', 4),
  ('Team Photo', '/images/gallery-5.jpg', 'team', 5),
  ('Community Event', '/images/gallery-6.jpg', 'events', 6)
ON CONFLICT DO NOTHING;

INSERT INTO settings (key, value)
VALUES
  ('company_name', 'Sport Water Ethiopia'),
  ('company_phone', '0926549254'),
  ('company_email', 'info@sportwater.et'),
  ('company_address', 'Addis Ababa, Ethiopia'),
  ('hero_title', 'Stay Hydrated. Stay Strong.'),
  ('hero_subtitle', 'Premium purified drinking water for athletes, families, offices, schools, and everyone who values clean hydration.'),
  ('about_mission', 'To provide every Ethiopian with access to premium, purified drinking water that supports health, performance, and wellbeing.'),
  ('about_vision', 'To become Ethiopias most trusted and loved bottled water brand, recognized for quality, sustainability, and community impact.'),
  ('about_quality', 'Our water undergoes a 7-step purification process including reverse osmosis, UV sterilization, and mineral balancing. Every batch is lab-tested for purity.'),
  ('about_delivery', 'Same-day delivery across Addis Ababa. Bulk orders for offices and schools with flexible scheduling and competitive pricing.'),
  ('video_url', ''),
  ('video_poster', '/images/video-poster.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO inventory (product_id, current_stock, low_stock_threshold)
SELECT id, stock, 50 FROM products
ON CONFLICT DO NOTHING;
