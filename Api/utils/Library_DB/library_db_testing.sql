select * from books;

select * from copies;

select * from users;

select * from admins;

select * from members;

select * from cart;

select * from loans;

update loans set return_date = '2024-06-24' where id = 45;

select * from recommendations;

insert into users (name,email,password,address,contact) values ("Admin","admin@gmail.com","123","123 Main St","123-456-7890");

INSERT INTO admins (user_id) VALUES (1);

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values ('Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming 3rd Edition',
'Eric Matthes',
'programming',
'2023',
'1718502702',
'Python Crash Course is the world’s best-selling guide to the Python programming language. This fast-paced, thorough introduction will have you writing programs, solving problems, and developing functioning applications in no time.

You’ll start by learning basic programming concepts, such as variables, lists, classes, and loops, and practice writing clean code with exercises for each topic. You’ll also learn how to make your programs interactive and test your code safely before adding it to a project. You’ll put your new knowledge into practice by creating a Space Invaders–inspired arcade game, building a set of data visualizations with Python’s handy libraries, and deploying a simple application online.

As you work through the book, you’ll learn how to:
Use powerful Python libraries and tools, including pytest, Pygame, Matplotlib, Plotly, and Django
Make increasingly complex 2D games that respond to keypresses and mouse clicks
Generate interactive data visualizations using a variety of datasets
Build apps that allow users to create accounts and manage their own data, and deploy your apps online
Troubleshoot coding errors and solve common programming problems',
'English',
'512',
'https://m.media-amazon.com/images/I/81py-nCTfrL._SY466_.jpg');

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values ('JavaScript Crash Course: A Hands-On, Project-Based Introduction to Programming',
'Nick Morgan',
'programming',
'2024',
'1718502265',
'Learn JavaScript—Fast!

JavaScript Crash Course is a fun-filled, fast-paced introduction to programming with JavaScript. Dive right in and you’ll be writing code, solving problems, and building working web applications and games in no time. You’ll start by learning fundamental programming concepts, such as variables, arrays, objects, functions, conditionals, loops, classes, and more. Aided by engaging examples and hands-on exercises, you’ll build on this foundation and combine JavaScript with HTML and CSS to create interactive web applications that you can run right away.

Then you’ll put your new skills into play with three substantial projects: a Pong-style game with a virtual opponent, an app that generates electronic music, and a platform for visualizing data fetched from an API.',
'English',
'376',
'https://m.media-amazon.com/images/I/713sKEvhMgL._SY466_.jpg');

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values ('C++ Programming Language, The 4th Edition',
'Bjarne Stroustrup',
'programming',
'2013',
'0321958322',
'The new C++11 standard allows programmers to express ideas more clearly, simply, and directly, and to write faster, more efficient code. Bjarne Stroustrup, the designer and original implementer of C++, has reorganized, extended, and completely rewritten his definitive reference and tutorial for programmers who want to use C++ most effectively.

The C++ Programming Language, Fourth Edition, delivers meticulous, richly explained, and integrated coverage of the entire language―its facilities, abstraction mechanisms, standard libraries, and key design techniques. Throughout, Stroustrup presents concise, “pure C++11” examples, which have been carefully crafted to clarify both usage and program design. To promote deeper understanding, the author provides extensive cross-references, both within the book and to the ISO standard.',
'English',
'1376',
'https://m.media-amazon.com/images/I/71uN0nVAkvL._SY466_.jpg'
);

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values (
'Python pour débutants: Programmer un réseau neuronal en 7 jours',
'Benjamin Spahic',
'Programming',
'2022',
'979-8357472946',
'Aimeriez-vous apprendre à programmer avec Pyhton 3 alors que vous n’avez aucune connaissance préalable ?
Pas de problème : avec l aide de ce guide du débutant, vous serez en mesure de comprendre les principes de base de la programmation orientée objet avec variables, boucles et classes en un rien de temps.
Ce guide couvre les bases de la programmation en Python. Des exemples concrets, des graphiques et de petits exercices aident à la compréhension tout au long du livre.
Avec l aide de ce guide pour débutants, de nombreux lecteurs satisfaits ont déjà réussi à se lancer et à développer leurs compétences - essayez vous-même !',
'French',
'147',
'https://m.media-amazon.com/images/I/51WhtcFja1L._SY466_.jpg'
);

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values (
'SQL QuickStart Guide: The Simplified Beginner s Guide to Managing, Analyzing, and Manipulating Data With SQL',
'Walter Shields',
'Programming',
'2019',
'1945051752',
'The Easiest Way to Learn SQL in a Comprehensive, Step-by-Step Guide

Not sure how to prepare for the data-driven future?

This book shows you EXACTLY what you need to know to successfully use the SQL programming language to enhance your career!

Are you a developer who wants to expand your mastery to database management?

Then you NEED this book. Buy now and start reading today!

The ubiquity of big data means that now more than ever there is a burning need to warehouse, access, and understand the contents of massive databases quickly and efficiently.

That’s where SQL comes in.

SQL is the workhorse programming language that forms the backbone of modern data management and interpretation.

Any database management professional will tell you that despite trendy data management languages that come and go, SQL remains the most widely used and most reliable to date, with no signs of stopping.

Written by an SQL Expert with Over 25 Years of Experience',
'English',
'242',
'https://m.media-amazon.com/images/I/61wEaFn6TmL._SY466_.jpg');


insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values (
'How Cybersecurity Really Works: A Hands-On Guide for Total Beginners',
'Sam Grubb',
'Computer Science',
'2021',
'1718501285',
'How Cybersecurity Really Works is an engaging introduction to the field of cybersecurity. You ll learn how attackers operate, as well as how to defend yourself and organizations against online attacks.

How Cybersecurity Really Works is the perfect introduction to cybersecurity. Whether you’re a computer science student or a business professional, it will teach you the basics without all the jargon.

This beginners guide covers different types of attacks, common tactics used by online adversaries, and defensive strategies you can use to protect yourself. You’ll learn what security professionals do, what an attack looks like from a cybercriminal’s viewpoint, and how to implement sophisticated cybersecurity measures on your own devices.

In addition, you’ll find explanations of topics like malware, phishing, and social engineering attacks, coupled with real-world examples and hands-on exercises to help you apply what you’ve learned. Youll explore ways to bypass access controls, prevent infections from worms and viruses, and protect your cloud accounts from attackers.',
'English',
'216',
'https://m.media-amazon.com/images/I/81tct4OqfdL._SY466_.jpg');

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values (
'Network Basics for Hackers: How Networks Work and How They Break ',
'Master OccupytheWeb',
'Computer Science',
'2023',
'979-8373290043',
'Following the success of Linux Basics for Hackers, OccupytheWeb does what he did for Linux to Networks. Networks of all types, including TCP/IP, Bluetooth Networks, Car Networks, W-iFi Networks, Radio Frequency Networks, SCADA/ICS Networks, and more. In his inimitable style, Master OTW makes the seemingly complex, simple.

This book is designed for beginner to intermediate cybersecurity professionals. It begins with the basics of networks and networking, examines network analysis with Wireshark and tcpdump, offers one of the most complete and in-depth analyses of Wi-Fi and Bluetooth networks, then progresses through the various protocols such as DNS, ARP, SMTP, and others. The reader will be led through the building of those applications in Linux, such as an EXIM server for email or a BIND server for DNS. Then OTW leads the reader through the major vulnerabilities of that protocol/application.

In the final chapters, OTW leads the reader through some of the networks on the leading-edge of cybersecurity, such as Car, Radio, and Industrial networks. There has never been book quite like this one!',
'English',
'276',
'https://m.media-amazon.com/images/I/61Rp8kZQLIL._SY466_.jpg');

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values (
'The Art of War',
'Sun Tzu',
'Philosophy',
'2018',
'9388369696',
'The Art of War is a renowned ancient Chinese military treatise written by Sun Tzu, a military strategist and philosopher. Composed around the fifth century BC, it provides valuable insights into warfare and strategy. The book emphasizes the importance of careful planning, understanding the enemy, exploiting weaknesses, and employing tactics to achieve victory. It covers various aspects of warfare, including tactics, intelligence gathering, leadership, and the importance of adaptability. It continues to be studied and applied in various fields beyond the military, including business and politics.',
'English',
'232',
'https://m.media-amazon.com/images/I/71xJdnydklL._SY466_.jpg');

insert into books (title, author, genre, publication_year, isbn, description, language, length, image_url) 
values (
'Quantum Physics for Beginners: From Wave Theory to Quantum Computing. Understanding How Everything Works by a Simplified Explanation of Quantum Physics and Mechanics Principles',
'Carl J. Pratt',
'Science',
'2021',
'979-8718003864',
'Have you always been curious about quantum physics and its mysteries but don’t know where to begin?

You have found the right place, your journey to learn quantum physics starts now!

Award-winner scientist, Carl J. Pratt, presents the most exhaustive and clear introduction to the topic. “Quantum Physics for Beginners” peels away layers of mystery to reveal what is behind most modern technological innovations.',
'English',
'103',
'https://m.media-amazon.com/images/I/71xYXV5h6+L._SY466_.jpg');

delete from loans;

update copies set status = 'available';

delete from cart;

SELECT b.title, b.author , b.image_url  FROM books b, cart c  WHERE b.id = c.book_id AND c.member_id = 2;

SELECT * FROM books WHERE title = 'The Art of War';

