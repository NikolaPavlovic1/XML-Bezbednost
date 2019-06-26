insert into user (user_id, name, surname, email, password, username, role) values (1, 'Petar', 'Petrovic', 'admin@gmail.com', '$2a$10$jChdiiMSaPYPLHj6uMATKO/40fK/xojxb8uzMjc9ACZLG/QC4PpYK', 'admin', 0);
insert into user (user_id, name, surname, email, password, username, role, status) values (2, 'User', 'User', 'user@gmail.com', '$2a$10$jChdiiMSaPYPLHj6uMATKO/40fK/xojxb8uzMjc9ACZLG/QC4PpYK', 'user', 1, 1);
insert into user (user_id, name, surname, email, password, username, role, business_id) values (3, 'Agent', 'Agent', 'agent@gmail.com', '$2a$10$jChdiiMSaPYPLHj6uMATKO/40fK/xojxb8uzMjc9ACZLG/QC4PpYK', 'agent', 2, '4');
insert into accommodation_type (id, name) values (1, 'hotel');
insert into location (id, longitude, lattitude, name) values (1, 23, 44, 'location');
insert into accommodation (id_agent, accomodation_type_id, description, category, location_id, accommodation_id, capacity, name, canceling_period, status) values (3, 1, 'desc', 1, 1, 1, 3, 'name', 3, 0);
insert into accommodation (id_agent, accomodation_type_id, description, category, location_id, accommodation_id, capacity, name, canceling_period, status) values (3, 1, 'desc', 1, 1, 2, 2, 'name1', 3, 0);
insert into price (id, from_date, one_night_price, to_date, id_accommodation) values (1, '2015-05-06', 10, '2015-05-09', 1);
insert into reservation (id, id_accommodation, id_user, from_date, to_date, status) values (1, 1, 2, '2015-05-06', '2015-05-11', 1);