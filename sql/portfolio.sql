-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 21, 2026 at 03:14 PM
-- Server version: 10.11.11-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `affiliations`
--

CREATE TABLE `affiliations` (
  `affiliation_id` int(11) NOT NULL,
  `affiliation_name` varchar(30) NOT NULL,
  `affiliation_url` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `affiliations`
--

INSERT INTO `affiliations` (`affiliation_id`, `affiliation_name`, `affiliation_url`) VALUES
(1, 'MRMLondon', 'http://mrm-meteorite.com'),
(2, 'Zentropy Partners', 'http://mrm-meteorite.com'),
(3, 'Christian Louboutin', 'http://www.christianlouboutin.com'),
(4, 'APL Digital', 'http://mrm-meteorite.com'),
(5, 'Betgenius', 'http://www.betgenius.com/products/customer-marketing/marketing-services/'),
(6, 'Anirog', 'http://www.mobygames.com/company/anco-software-ltd'),
(7, 'Jollywise Media', 'https://www.jollywise.co.uk'),
(8, 'Kerve', 'http://www.kerve.co.uk'),
(9, 'CTV Multimedia Studio', 'http://www.ctvob.co.uk/');

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `award_id` int(11) NOT NULL,
  `award_result` text NOT NULL,
  `award_category` text NOT NULL,
  `award_name` text NOT NULL,
  `award_long_name` text NOT NULL,
  `award_url_link` text NOT NULL,
  `award_pdf_link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`award_id`, `award_result`, `award_category`, `award_name`, `award_long_name`, `award_url_link`, `award_pdf_link`) VALUES
(1, 'Winner', 'B2C Measurement &amp; Results', 'BIMA', 'British Interactive Media Association', 'http://www.bima.co.uk/bima-award/020E131703/bima-awards-2008/view-shortlist/81/', 'pdf/intelstudio-bima.pdf'),
(2, 'Finalist', 'Best Technology Campaign', 'NMA', 'New Media Age Effectiveness', '', ''),
(3, 'Finalist', 'B2C Measurement &amp; Results', 'BIMA', 'British Interactive Media Association', 'http://www.bima.co.uk/bima-award/020E131703/bima-awards-2008/view-shortlist/53/', 'pdf/msn-minimise-bima.pdf'),
(4, 'Finalist', 'Entertainment', 'NMA', 'New Media Age Effectiveness', '', ''),
(5, 'Winner', 'Business to Business', 'NMA', 'New Media Age Effectiveness', '', 'pdf/ups-nma.pdf'),
(6, 'Finalist', 'Best Integrated Campaign', 'IAA', 'Innovative Advertising Awards', '', 'pdf/ups-iaa.pdf'),
(7, 'Finalist', '', 'IMAA', 'Interactive Marketing and Advertising', '', ''),
(8, 'Winner', 'Technology', 'NMA', 'New Media Age Effectiveness', '', 'pdf/kittycaper-nma.pdf'),
(9, 'Winner', 'Technology', 'IMAA', 'Interactive Marketing and Advertising', '', 'pdf/kittycaper-imaa.pdf'),
(10, 'Bronze', 'Online Advertising', 'DMA', 'Direct Marketing Association', '', 'pdf/kittycaper-dma.pdf'),
(11, 'Merit', '', 'One Show Interactive', 'One Show Interactive', 'http://www.oneclub.org/#olb=/_ajax/archive/?action=arc_work%26value=2628', 'pdf/tourismireland-oneshow.pdf'),
(12, 'Finalist', 'Interactive Banner', 'LIA', 'London International Advertising', 'http://2008.liaawards.com/2004/finalists/finalists/interactive/i29.html', 'pdf/tourismireland-liaa.pdf'),
(13, '1st Runner Up', '', 'Creative Showcase', 'Creative Showcase', 'http://www.creativeshowcase.net/campaigns/window-on-ireland', 'pdf/tourismireland-creativeshowcase.pdf'),
(14, 'Bronze', 'Schools and Education', 'Lovies\n', 'Lovies', 'http://winners.lovieawards.eu/share/?y=2015&a=215', 'pdf/nickelodeon-nickleap-lovie.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `category_label` varchar(20) NOT NULL,
  `category_description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_label`, `category_description`) VALUES
(1, 'web', 'Websites', 'A selection of websites I have built over the years.'),
(2, 'olm', 'OLM', 'A selection of online media I have built over the years.'),
(3, 'responsive', 'Responsive', 'A selection of responsive websites I have built over the years.'),
(4, 'prototype', 'Prototypes', 'A selection of prototypes I have built over the years.'),
(5, 'game', 'Games', 'A selection of games I have built over the years.'),
(6, 'app', 'Apps', 'A selection of native apps I have built over the years.');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `client_name` text NOT NULL,
  `client_key` text NOT NULL,
  `client_logo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `client_name`, `client_key`, `client_logo`) VALUES
(1, 'Intel', 'intel', 'intel-logo'),
(2, 'Kraft', 'kraft', 'kraft-logo'),
(3, 'Sky', 'sky', 'sky-logo'),
(4, 'Mastercard', 'mastercard', 'mastercard-logo'),
(5, 'MRM', 'mrm', 'mrm-logo'),
(6, 'MSN', 'msn', 'msn-logo'),
(7, 'Microsoft', 'microsoft', 'microsoft-logo'),
(8, 'UPS', 'ups', 'ups-logo'),
(9, 'Unilever', 'unilever', 'unilever-logo'),
(10, 'Louboutin', 'louboutin', 'louboutin-logo'),
(11, 'Magnum', 'magnum', 'magnum-logo'),
(12, 'Peugeot', 'peugeot', 'peugeot-logo'),
(13, 'Opel', 'opel', 'opel-logo'),
(14, 'HP', 'hp', 'hp-logo'),
(15, 'Nesquik', 'nesquik', 'nesquik-logo'),
(16, 'Natwest', 'natwest', 'natwest-logo'),
(17, 'Mini', 'mini', 'mini-logo'),
(18, 'Birdseye', 'birdseye', 'birdseye-logo'),
(19, 'APL', 'apl', 'apl-logo'),
(20, 'Tourism Ireland', 'tourismireland', 'tourismireland-logo'),
(21, 'Betgenius', 'betgenius', 'betgenius-logo'),
(22, 'Alico', 'alico', 'alico-logo'),
(23, 'Anirog', 'anirog', 'anirog-logo'),
(24, 'Jollywise', 'jollywise', 'jollywise-logo'),
(25, 'Cartoon Network', 'cartoonnetwork', 'cartoonnetwork.jpg'),
(26, 'Disney', 'disney', 'disney.jpg'),
(27, 'Nickelodeon', 'nickelodeon', 'nickelodeon.jpg'),
(28, 'Samsung', 'samsung', 'samsung.jpg'),
(29, 'Sony', 'sony', 'sony.jpg'),
(30, 'Universal', 'universalpictures', 'universalpictures.jpg'),
(31, 'Vocalink', 'vocalink', ''),
(32, 'Sightsavers', 'sightsavers', ''),
(33, 'Royal Mail', 'royalmail', ''),
(34, 'Turner', 'turner', ''),
(35, 'BBC', 'bbc', ''),
(36, 'Telstar', 'telstar', ''),
(37, 'Fidelity', 'fidelity', ''),
(38, 'DC Thompson', 'dcthompson', '');

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `entry_id` int(11) NOT NULL,
  `entry_title` varchar(50) NOT NULL,
  `entry_description` text NOT NULL,
  `entry_responsibilities` text NOT NULL,
  `entry_year` year(4) NOT NULL DEFAULT 2017,
  `entry_week` int(2) NOT NULL DEFAULT 1,
  `entry_key` varchar(40) NOT NULL,
  `entry_isactive` tinyint(1) NOT NULL DEFAULT 1,
  `entry_isfeatured` tinyint(1) NOT NULL DEFAULT 1,
  `entry_isnda` tinyint(1) NOT NULL DEFAULT 1,
  `entry_issummary` tinyint(1) NOT NULL DEFAULT 1,
  `entry_isresponsive` tinyint(1) NOT NULL DEFAULT 1,
  `ModifiedTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CreatedTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`entry_id`, `entry_title`, `entry_description`, `entry_responsibilities`, `entry_year`, `entry_week`, `entry_key`, `entry_isactive`, `entry_isfeatured`, `entry_isnda`, `entry_issummary`, `entry_isresponsive`, `ModifiedTime`, `CreatedTime`) VALUES
(1, 'iPhone prototype', 'Prototype produced for an MRM three day working session with Kraft.', 'Developer. Responsible for prototyping an iphone web app using phonegap. Using Javascript to draw to the HTML 5 canvas in order to simulate fruit machine like behaviour with barrels that roll when shaken.', 2010, 2, 'prototype', 0, 0, 0, 0, 1, '2017-02-09 10:37:23', '2011-01-01 12:00:00'),
(2, 'IIP', 'Flash front-end to a portal website for third party computer suppliers designed to enable them to create customised marketing pages.', 'Flash developer. Responsible for interaction design and build.', 2010, 1, 'iip', 1, 0, 0, 0, 1, '2017-02-09 10:37:23', '2011-01-01 12:00:00'),
(3, 'UCL Marquee', 'A simple image and video carousel built for Mastercard&rsquo;s UK site.', 'Flash developer. Responsible for build. This simple project provided me with my first opportunity to use the <a href=\"http://www.robotlegs.org/\">Robotlegs framework</a> that I had previously been looking at.', 2009, 1, 'carousel', 1, 1, 0, 0, 1, '2017-02-08 14:43:03', '2011-01-01 12:00:00'),
(4, 'ITG Pathfinding', 'A subsection of the Pan European Intel Game On website, Inside the game was created to tell the story of the technologies used in games today.', 'Flash developer. Responsible for interaction design and build of this simulation for the <a href=\"http://game-on.intel.com/eng/geekout/inside-the-game/pathfinder/default.aspx\">Inside the game</a> section of the Intel Game On site. Made use of <a href=\"http://www.dauntless.be/astar/\">dauntless.be&rsquo;s</a> implementation of the A* algorithm for this pathfinding based simulation.', 2009, 1, 'insidethegamepathfinding', 1, 1, 0, 0, 1, '2017-02-08 14:43:06', '2011-01-01 12:00:00'),
(5, 'ITG Particles', 'A subsection of the Pan European Intel Game On website, Inside the game was created to tell the story of the technologies used in games today.', 'Flash developer. Responsible for interaction design and build of this simulation for the <a href=\"http://game-on.intel.com/eng/geekout/inside-the-game/particle/default.aspx\">Inside the game</a> section of the Intel Game On site. Made use of <a href=\"http://flintparticles.org/\">flint particles</a>, an excellent open-source particle system library for Flash and Flex developed by <a href=\"http://www.richardlord.net/blog\">Richard Lord</a> for this particle based simulation.', 2009, 1, 'insidethegameparticles', 1, 1, 0, 0, 1, '2017-02-08 14:43:10', '2011-01-01 12:00:00'),
(6, 'Training videos', 'A microsite created to deliver training videos to MRMworks users.', 'Flash developer. Responsible for build.', 2009, 1, 'works', 1, 1, 0, 0, 1, '2017-02-08 14:43:15', '2011-01-01 12:00:00'),
(7, 'Game On', 'The Pan European Intel Game On website showcases Intel&rsquo;s collaboration with top computer and video game companies and designers.', 'Flash developer. The 2010 version involved working with a global Intel marquee template developed by a US agency, and integrating the Game On content.', 2010, 1, 'gameon2010', 1, 0, 0, 0, 1, '2017-02-09 10:37:23', '2011-01-01 12:00:00'),
(8, 'Game On', 'The Pan European Intel Game On website showcases Intel&rsquo;s collaboration with top computer and video game companies and designers.', 'Flash developer. The 2008 version was an upgrade the original marquee created by a flash designer in 2006.', 2008, 1, 'gameon2008', 1, 0, 0, 0, 1, '2017-02-14 19:04:24', '2011-01-01 12:00:00'),
(9, 'Studio', 'The Intel Studio website allowed unsigned bands to upload tracks which other site visitors could then listen to and rank according to their favourites. The best acts as voted for were then offered support slots at a series of Intel Studio gigs. The <a href=\"http://www.music-news.com/ShowNews.asp?nItemID=22606&amp;bPrint=1\">winner</a> was offered a record contract.', 'Flash developer. Responsible for interaction design and build of this collection of XML driven flash widgets, including a jukebox, mp3 player, video player, news ticker and a Facebook player. All data was consumed via SOAP services. The Facebook player enabled users to embed a music player of their favourite bands track on their homepage.', 2008, 1, 'studio', 1, 1, 0, 0, 1, '2017-02-09 17:57:03', '2011-01-01 12:00:00'),
(10, 'MinimiseMe', 'MinimiseMe was a flash application which enabled users to customise their own &#8216;emoticons&#8217; and characters. In addition, a series of preset British celebrity Minimise Me characters were available. The application was essentially a flash version of Nintendo&rsquo;s Mii character creator, with added integration into Windows Messenger. MinimiseMe was even mentioned on the Sun website.', 'Flash developer. The majority of the development work was done by an excellent contractor, <a href=\"http://uk.linkedin.com/pub/alan-killip/3/51b/522\">Alan Killip</a>. I handled the final amends and polish to the build after Alan&rsquo;s contract finished.', 2008, 1, 'minimiseme', 1, 1, 0, 0, 1, '2017-02-09 13:34:46', '2011-01-01 12:00:00'),
(11, 'Dynamics', 'A small microsite created for the launch of Microsoft Dynamics\', and designed to explain the business benefits of their business communications software.', 'Flash developer. Responsible for interaction design and build. Built with a simple 3d system to handle the parallax scrolling. The content inside the rooms was created by a contractor and loaded as external swf modules.', 2007, 1, 'dynamics', 1, 0, 0, 0, 1, '2017-02-14 19:55:40', '2011-01-01 12:00:00'),
(12, 'Slack-O-Meter', 'MSN produced 10 short videos featuring the comedian Ed Burn to promote their MSN Video service. They then needed a way of drive traffic to the videos and requested a concept that could potentially go viral. The Slack-0-metre site asked users to pledge to watch the videos (at work) and then tells them how much of their employer&rsquo;s money they would have wasted by doing so.', 'Flash developer. Responsible for interaction design and build.', 2007, 1, 'videoviral', 1, 1, 0, 0, 1, '2017-02-09 18:43:48', '2011-01-01 12:00:00'),
(13, 'Widget', 'This site was part of a wider campaign to support the launch of a new parcel tracking desktop widget, and was responsible for the introduction to the digital character and download of the executable. A total of 3.3m visitors hit the UPS widget site and it was downloaded 78,737 times.', 'Flash developer. Responsible for interaction design and build of this XML driven Flash micro-site. The biggest challenge with this project was an aggressive deadline that meant I had three weeks to deliver the core flash application.', 2007, 1, 'widget', 1, 1, 0, 0, 1, '2017-02-09 18:35:53', '2011-01-01 12:00:00'),
(14, 'Heartbrand', '<p>People love ice cream, but they often worry about what goes into it.</p><p>So the big idea behind Wall’s Heartbrand pan European web site redesign was that by interacting with the ingredients (milk, chocolate, fruit) in their simplest forms, carefully sourced and diligently prepared, we can see that there are no artificial colours or preservatives.</p><p>Customers can experience for themselves the passion and fun Wall’s has for their ice cream.</p>', 'Flash developer. Responsible for build. All data pulled from a Magnolia CMS backend.', 2007, 1, 'heartbrand', 1, 0, 0, 0, 1, '2017-02-15 10:44:23', '2011-01-01 12:00:00'),
(15, 'Kidsfun', 'Alongside the walls.co.uk site build, Unilever commissioned a microsite that appealed to children and featured key children\'s ice cream products.', 'Flash developer. Responsible for build.', 2007, 1, 'kidsfun', 1, 0, 0, 0, 1, '2017-02-14 19:49:10', '2011-01-01 12:00:00'),
(16, 'Search Ladder', 'Search ladder was a game which used the MSN Search API and saw two celebrities pit against each other, allowing the user to select a keyword from a pre-defined list. The player had to determine which celebrity would return the most search result for a specific keyword and made use of real-time MSN Search query\'s to determine if the selected celebrity was correct.', 'Flash developer. Completed this project when the contractors\' term ended.', 2007, 1, 'searchladder', 1, 0, 0, 0, 1, '2017-02-14 20:05:25', '2011-01-01 12:00:00'),
(17, 'vPro Competition', 'Intel vPro was a new business technology platform, announced to the press in 2006. The vPro competiton microsite ran for three months and was designed to raise awareness of the platform. It featured technology questions and pattern recognition challenges. The winner in each country received an all-expenses paid trip to a European Grand Prix event.', 'Flash developer. Responsible for interaction design and build.', 2006, 1, 'vprocompetition', 1, 0, 0, 0, 1, '2017-02-17 14:17:13', '2011-01-01 12:00:00'),
(18, 'Dynamic Duo', 'IT Manager 2 was an award-winning flash sim game developed for Intel, to promote Intel products and technologies in-game to their IT audience. I built a series of self-contained game modules, designed to run standalone as promotional units, as well as integrated into the main sim game.', 'Flash developer. Responsible for interaction design and build of game module. All text content, game settings and levels were configurable via external XML files. Dynamic Duo made use of A* for pathfinding.', 2007, 1, 'itmgdynamicduo', 1, 1, 0, 0, 1, '2017-02-09 19:03:48', '2011-01-01 12:00:00'),
(19, 'PC Meltdown', 'IT Manager 2 was an award-winning flash sim game developed for Intel, to promote Intel products and technologies in-game to their IT audience. I built a series of self-contained game modules, designed to run standalone as promotional units, as well as integrated into the main sim game.\r\n<br/><br/>\r\nControls are:<br/>\r\nI = Thrust<br/>\r\nJ = Rotate Left<br/>\r\nL = Rotate Right<br/>\r\nA = Fire<br/>\r\nS = Boost', 'Flash developer. Responsible for interaction design and build of game module. All text content, game settings and levels were configurable via external XML files. PC Meltdown was a retro asteroids type clone, and was built with a top down virtual camera to handle sprite movement, and had a modular system for power-ups and enemies.', 2007, 1, 'itmgpcmeltdown', 1, 1, 0, 0, 1, '2017-02-09 19:00:52', '2011-01-01 12:00:00'),
(20, 'Hacker Invasion', 'IT Manager 2 was an award-winning flash sim game developed for Intel, to promote Intel products and technologies in-game to their IT audience. I built a series of self-contained game modules, designed to run standalone as promotional units, as well as integrated into the main sim game.', 'Flash developer. Responsible for interaction design and build of game module. All text content, game settings and levels were configurable via external XML files. Hacker Invasion was a puzzle game that made use of isometric projection.', 2006, 1, 'itmghackerinvasion', 1, 1, 0, 0, 1, '2017-02-09 19:10:33', '2011-01-01 12:00:00'),
(21, 'CEO', 'IT Manager 2 was an award-winning flash sim game developed for Intel, to promote Intel products and technologies in-game to their IT audience. I built a series of self-contained game modules, designed to run standalone as promotional units, as well as integrated into the main sim game.', 'Flash developer. Game module conversion of original ITMG1 version.', 2006, 1, 'itmgceo', 1, 0, 0, 0, 1, '2017-02-17 14:20:54', '2011-01-01 12:00:00'),
(22, 'Boutique', 'I worked with designer <a href=\"http://cockenadoodledoo.com/\">Jared Cocken</a> to create <a href=\"http://www.christianlouboutin.com/\">Christian Louboutins\'</a> first web presence.', 'Flash developer. Responsible for build of this XML driven Flash microsite.', 2005, 1, 'boutique', 1, 1, 0, 0, 1, '2017-02-14 12:35:19', '2011-01-01 12:00:00'),
(23, 'Five Senses', 'Magnum wanted a website for the limited-edition Magnum 5 Senses ice cream to be purchase-linked, promotion-led and focused on the bottom line. They also wanted it to be engaging and interactive. Users could play a spin-the-globe game to win instant prizes over the ten week campaign. The campaign ended with one lucky player winning a &pound;50K cash prize.', 'Flash developer. Responsible for interaction design and build of the XML driven flash elements.', 2005, 1, 'senses', 1, 0, 0, 0, 1, '2017-02-17 14:08:47', '2011-01-01 12:00:00'),
(24, 'Search Supremo', 'The objective of this campaign micro-site was to drive consumers to the MSN Search site in a creative and engaging manner whilst at the same time reminding them that MSN Search delivers relevant results, fast. It drove 1,000,000 search queries and had 250,000 user sessions in the six weeks it was live. It&rsquo;s success meant it was re-skinned as a football competition six months later.', 'Flash developer. Responsible for the build of the XML driven flash elements. I worked closely with the server side developer to interface with the web application. The flash elements were composed into an online quiz, making use of the MSN search bar. All quiz logic was run from the server as a cash prize could be won.', 2005, 1, 'searchsupremo', 1, 1, 0, 0, 1, '2017-02-09 19:23:06', '2011-01-01 12:00:00'),
(25, 'Kitty Caper Game', 'The Kitty Caper Game was a &#8216;point and click&#8217; game designed to explain the benefits of the MSN Search Toolbar, as well as encourage downloads. The game was a huge success when launched, enthusiastically played by the online gaming community. Several gaming forums had threads (<a href=\"http://www.gamershood.com/forum/showthread.php?t=281\">see example</a>) devoted to solving the game. The target of 20,000 Search Toolbar downloads was tripled, with MSN registering 60,000 downloads within the first two weeks. 158,000 email addresses registered to play Kitty Caper, with an average gameplay of 146 minutes.', 'Flash developer. Responsible for interaction design and build of this XML driven Flash game. I worked with 3 Flash animators who built the Flash assets and animation sequences.', 2005, 1, 'kittycaper', 1, 1, 0, 0, 1, '2017-02-09 19:19:31', '2011-01-01 12:00:00'),
(26, 'SmartNav', 'A campaign destination microsite to promote Peugeots Smartnav feature in its 407 Saloon and SW models.', 'Flash developer. Responsible for interaction design and build.', 2005, 1, 'smartnav', 1, 0, 0, 0, 1, '2017-02-17 14:05:41', '2011-01-01 12:00:00'),
(27, 'Tigra Twintop', 'GM wanted a launch campaign that would generate dealer leads. The Tigra TwinTop only had 2 seats, so you had to choose your passenger wisely. The rendezvous microsite enabled you to take someone on a virtual \'date\' drive to get you in the mood to try it for real.', 'Flash developer. Responsible for interaction design and build of this XML driven Flash application. I worked with two Flash animators who built Flash assets and animation sequences. This website was deployed in seven different languages in countries across Europe.', 2004, 1, 'tigra', 1, 1, 0, 0, 1, '2017-02-14 12:49:19', '2011-01-01 12:00:00'),
(28, 'F1 Screensavers', 'Following the merger between HP and Compaq, HP inherited the role of principal sponsor of the BMW WilliamsF1 Team. After the successful campaign for Compaq&rsquo;s Formula One participation, HP looked to Zentropy to support the sponsorship change, and utilise this high-profile partnership to illustrate its core brand and product values to current and prospective customers.', 'Creative lead for Zentropy&rsquo;s online activity for Compaq (Hewlett Packard after the merger) across EMEA territories for three consecutive years. I was responsible for concept development and ensuring adherence to the online guidelines across all projects, spanning OLM, page template design and rich media micro-sites. I was also the Flash developer, responsible for interaction design and build of rich media modules.', 2004, 1, 'f1dynamicscreensaver', 1, 1, 0, 0, 1, '2017-02-16 11:14:01', '2011-01-01 12:00:00'),
(29, 'F1 Interactive Car', 'Following the merger between HP and Compaq, HP inherited the role of principal sponsor of the BMW WilliamsF1 Team. After the successful campaign for Compaq&rsquo;s Formula One participation, HP looked to Zentropy to support the sponsorship change, and utilise this high-profile partnership to illustrate its core brand and product values to current and prospective customers.', 'Creative lead for Zentropy&rsquo;s online activity for Compaq (Hewlett Packard after the merger) across EMEA territories for three consecutive years. I was responsible for concept development and ensuring adherence to the online guidelines across all projects, spanning OLM, page template design and rich media micro-sites. I was also the Flash developer, responsible for interaction design and build of rich media modules.', 2003, 1, 'f1interactivecar', 1, 0, 0, 0, 1, '2017-02-16 11:13:49', '2011-01-01 12:00:00'),
(30, 'Plus Game', 'Nestl&eacute; commissioned Zentropy Partners to create a consumer loyalty programme for the Nesquik brand. The aim was to build a consistent experience across European markets and make it relevant to &lsquo;digitally literate&rsquo; six and seven year olds. The result was an award wining rich brand experience website with interactive stickers, a treehouse builder and games.', 'Flash developer. Responsible for interaction design and build.', 2004, 1, 'plus', 1, 1, 0, 0, 1, '2017-02-14 13:26:29', '2011-01-01 12:00:00'),
(31, 'Hop A Long Quicky', 'Nestl&eacute; commissioned Zentropy Partners to create a consumer loyalty programme for the Nesquik brand. The aim was to build a consistent experience across European markets and make it relevant to &lsquo;digitally literate&rsquo; six and seven year olds. The result was an award wining rich brand experience website with interactive stickers, a treehouse builder and games.', 'Macromedia Director developer. Responsible for interaction design and build.', 2001, 1, 'hopalong', 1, 1, 0, 0, 1, '2017-02-14 13:55:40', '2011-01-01 12:00:00'),
(32, 'Advantage Gold', 'The site was designed to help sell the benefits of the fee based account Advantage Gold. It was one part of an integrated campaign that included Press, Radio, DM and TV as well as in branch posters.', 'Flash Designer. Responsible for graphic and interaction design of the microsite and associated ad units in the olm campaign.', 2002, 1, 'advantagegold', 1, 0, 0, 0, 1, '2017-02-17 13:49:34', '2011-01-01 12:00:00'),
(33, 'Avengers Screensaver', 'In 1998 a new avengers film was released. We created this downloadable screensaver as a cross promotion for the mini website.', 'Flash designer. Responsible for build.', 1998, 1, 'avengers', 1, 0, 0, 0, 1, '2017-02-17 14:30:47', '2011-01-01 12:00:00'),
(34, 'Lost Continent', '<p>In the late 90s children were increasingly using the Internet. It provided a great opportunity for Unilever to make a significant investment in the new Captain Birds Eye brand across all their main European markets.</p><p>The site was an ambitious interactive experience that invited users to join the Captain’s crew and participate in his adventures. A series of interactive adventure episodes were built in Flash and optimised across 7 European markets.</p>', 'Flash developer. Responsible, as part of team, for script, character design, interaction design and project management.', 1999, 1, 'continent', 1, 1, 0, 0, 1, '2017-02-17 13:50:10', '2011-01-01 12:00:00'),
(35, 'HD+', 'As part of an online brand awareness campaign, MRM were responsible for producing online rich media executions that allowed the user to interact with video clips and immerse themselves in the HD experience offered by this footage.', 'Flash developer. Responsible for interaction design and build.', 2009, 1, 'hdplus', 1, 1, 0, 0, 1, '2017-02-08 14:27:25', '2011-01-01 12:00:00'),
(36, 'Relevant Content', 'A series of ad units developed for Sky to help promote new TV bundles available at the time.', 'Flash developer. Responsible for build.', 2009, 1, 'rcc', 1, 1, 0, 0, 1, '2017-02-09 18:28:19', '2011-01-01 12:00:00'),
(37, 'HD', 'As part of an online brand awareness campaign, MRM were responsible for producing online rich media executions that allowed the user to interact with and immerse themselves in the experience offered by Sky HD.\n<p>Built for flashtalking platform.</p>', 'Flash developer. Responsible for interaction design and build.', 2008, 1, 'hd', 1, 1, 0, 0, 1, '2017-02-09 18:22:48', '2011-01-01 12:00:00'),
(38, 'Video Wall', 'The brief was to promote the quantity and variety of content on the <a href=\"http://video.uk.msn.com/\">video section</a> of MSN\'s site. In response, MRM suggested building an MPU that simulated an \'infinite scrolling\' video wall.\r\n\r\n', 'Flash developer. Responsible for interaction design and build. The main challenge was dealing with the lack of api documentation for the video service.', 2008, 1, 'videowall', 1, 0, 0, 0, 1, '2017-02-17 14:01:40', '2011-01-01 12:00:00'),
(39, 'Key Hole', 'Two online ad placements were seamlessly synchronised with a shared hi-res image. As the mouse position changed the image scrolled around both ad placements. Most of the development work was done by an excellent contractor, <a href=\"http://uk.linkedin.com/pub/alan-killip/3/51b/522\">Alan Killip</a>. I was involved with the final amends and polish to the build after Alan\'s contract finished.\n<p>Built for flashtalking platform.</p>', 'Flash developer.', 2007, 1, 'keyhole', 1, 1, 0, 0, 1, '2017-02-09 18:33:06', '2011-01-01 12:00:00'),
(40, 'People Ready', 'People ready was a software and hardware solution for SME and Microsoft UK wanted an interactive ad unit to introduce it online.', 'Flash developer. Responsible for build.', 2007, 1, 'bcc', 1, 0, 0, 0, 1, '2017-02-14 19:59:56', '2011-01-01 12:00:00'),
(41, 'Office 2003', 'A European wide launch campaign for Microsoft Office 2003 featuring flash and non-flash ad units in all traditional sizes alongside various Eyeblaster rich media.', 'Flash developer. Responsible for build.', 2003, 1, 'diver', 1, 0, 0, 0, 1, '2017-02-14 19:31:48', '2011-01-01 12:00:00'),
(42, 'Hotmail', 'MSN launched a new and improved 250Mb version of MSN Hotmail. They required a suite of online advertising units to promote the launch. Key product features included larger inbox size and localised domain names. The target audience were existing Hotmail and competing web email users. The idea was to take MSN\'s primary brand icon - The Butterfly - and create a series of elegant ad units that drew together these key features. The final executions are reminiscent of a fully rendered 3D sequence and yet were delivered within traditional ad unit file sizes as low as 15k.', 'Flash developer. Responsible for interaction design and build of a template ad unit in a variety of sizes.', 2004, 1, 'hotmail', 1, 1, 0, 0, 1, '2017-02-14 13:30:45', '2011-01-01 12:00:00'),
(43, 'Windows on Ireland', 'The brief was to develop short but effective online tactical campaigns encouraging people to visit the new Tourism Ireland web site. I worked with a designer developing concepts and building the Flash executions in a wide range of formats and to allow easy adaptation for multiple languages. The executions used subtle animation effects overlaying scenic photography. The natural effects are all code based to reduce file size.', 'Flash developer, responsible for concept development, interaction design and build.', 2003, 1, 'windows', 1, 1, 0, 0, 1, '2017-02-14 13:36:01', '2011-01-01 12:00:00'),
(44, 'Advantage Gold', 'The olm was designed to drive traffic to the Advantage Gold microsite which was one part of an integrated campaign that included Press, Radio, DM and TV as well as in branch posters.', 'Flash Designer. Responsible for graphic and interaction design of the microsite and associated ad units in the olm campaign.', 2002, 1, 'ag', 1, 1, 0, 0, 1, '2017-02-14 13:42:18', '2011-01-01 12:00:00'),
(45, 'Betgenius Various', 'Working from photoshop flat designs I built various ad units for clients of Betgenius, and integrated them into the Connextra adserver platform. The ads had to be built using actionscript 2 as the platform only supported flash player 8 (AS2) at the time.', 'Flash developer. Responsible for build.', 2011, 1, 'variousolm', 1, 1, 0, 0, 1, '2017-02-09 10:37:23', '2011-01-01 12:00:00'),
(46, 'MetLife', 'A complex and challenging project that unfortunately never went live. Metlife was a financial planning tool that enabled users to adjust personal financial scenarios via sliders and drag and drop elements. The application visualised the result of decisions made via the use of animated graphs and a series of characters that responded to the changing scenarios. This enabled users to see the impact of certain decisions in a rich and accessible way. To conclude the user was sent a pdf personalised plan summary detailing all the information they had entered.', 'Flash developer. Responsible for build of the model for a financial application.', 2010, 1, 'metlife', 1, 1, 0, 0, 1, '2017-02-09 10:37:23', '2011-01-01 12:00:00'),
(47, '8-bit Games', '<p>Skramble - You fly your spaceship through a cave system split in six sections. Pressing the joystick button will unleash both your front mounted gun and your bombs. Missiles will launch in your path in order to intercept you, and you must not only shoot those down, but also bomb all fuel cisterns you see, or you will run out of fuel.</p>\n\n<p>Admittedly it doesn\'t look like much now. However, if you grew up playing home console games in the 80\'s then you\'ll probably appreciate it. There\'s more tearing and graphical glitches then I remember, maybe due to using an emulator!</p>', 'Whilst doing my A levels I bought a Commodore Vic20 and taught myself to program in assembly. I designed and programmed 3 commercial games (Skramble, Jungle Drums and Cosmic Commando) for the Vic20 and Commodore 64.', 1983, 1, 'variousgames', 1, 1, 0, 0, 1, '2017-02-14 14:10:30', '2011-01-01 12:00:00'),
(49, 'Ben 10 Omniverse', '<p>Ben 10 is a popular children\'s animated TV series. I was approached to help build this website designed to promote the launch of the new TV series. The initial promotion involved releasing two new games a week. Players had to complete tasks in games to unlock new content. The campaign has now ended but the games are still proving popular.</p>\n\n<p>The site was live in 17 markets, and has had an average engagement of 14 minutes per visit, and over 5 million unique visits.</p>', 'Flash Developer, responsible for website build, excluding the ten games. The excellent <a href=\'http://uk.linkedin.com/pub/pawel-drozd/4/848/267\'>Pawel Drozd</a> developed the games.', 2012, 36, 'benten', 1, 1, 0, 0, 1, '2026-02-18 14:45:48', '2012-10-01 12:00:00'),
(50, 'Share The Magic', '<p>A seasonal website for Disney&rsquo;s Share the Magic. The site launched with a Christmas Wish List competition, and then provided an online &rsquo;letter to Santa&rsquo; section. The letter writing component ran in parallel with an offline component, where participating Disney Store&rsquo;s allowed children to write letters and post them in-store.</p>\n<p>For each letter received, Disney donated a soft toy to a variety of local children&rsquo;s charities (up to 10,000 toys)</p>', 'Flash Developer, responsible for website build.', 2012, 48, 'stm2012', 1, 1, 0, 0, 1, '2026-02-18 14:45:55', '2012-12-01 12:00:00'),
(51, 'Epic Mickey', 'Facebook promotion.', 'Flash Developer responsible for build.', 2012, 1, 'epicmickey', 1, 1, 0, 0, 1, '2026-02-18 14:45:59', '2012-09-01 12:00:00'),
(52, 'Ben 10 Alien Unlock', 'Following the Ben 10 Omniverse campaign sites success, I was approached to build a simple version of the site that enabled users to quickly play the still popular games.', 'Flash Developer, responsible for website build, excluding the ten games. The excellent <a href=\'http://uk.linkedin.com/pub/pawel-drozd/4/848/267\'>Pawel Drozd</a> developed the games.', 2013, 1, 'bentenrepack', 1, 1, 0, 0, 1, '2026-02-18 14:44:45', '2013-02-01 12:00:00'),
(53, 'Ben 10 Alien Unlock 2', '<p>New year, new Ben 10 episodes. I was approached to build a new site that enabled users to play 5 new games featuring the new aliens. I also built the featured javascript voting app.</p>\n<p>The site used a simpler game release mechanic than the original Ben 10 Omniverse site, and went live in 18 markets.</p>', 'Flash Developer, responsible for website build, excluding the ten games. The excellent <a href=\'http://uk.linkedin.com/pub/pawel-drozd/4/848/267\'>Pawel Drozd</a> developed the games.', 2013, 10, 'unlock2', 1, 1, 0, 0, 1, '2026-02-18 14:44:52', '2013-03-01 12:00:00'),
(54, 'Chimpanzee Quiz', 'Nickelodeon teamed up with Disneynature\'s Chimpanzee to create a microsite with a quiz that allowed users to enter a competition to win an adventure holiday.', 'Front-end developer responsible for the Javascript quiz component of this microsite.', 2013, 16, 'chimpquiz', 1, 1, 0, 0, 1, '2026-02-18 14:44:58', '2013-04-01 12:00:00'),
(55, 'Iron Man 3', 'Flash Interactive banner in various sizes. The Iron Man 3 video plays with interactive hotspots tracking elements over the top. The aim of the interactive was for the user to engage with the ad by clicking as many hotspots as they can.', 'Flash Developer responsible for build.', 2013, 16, 'ironman3it', 1, 1, 0, 0, 1, '2026-02-18 14:45:07', '2013-04-15 12:00:00'),
(56, 'Ben 10 Alien Unlock 2 Repack', 'I built a simple version of the Unlock 2 site that enabled users to quickly play the still popular games.', 'Flash Developer, responsible for website build, excluding the ten games. The excellent <a href=\'http://uk.linkedin.com/pub/pawel-drozd/4/848/267\'>Pawel Drozd</a> developed the games.', 2013, 19, 'unlock2repack', 1, 1, 0, 0, 1, '2026-02-18 14:45:13', '2013-04-30 12:00:00'),
(57, 'Monsters University', 'An interesting project. Required a variety of skills.', 'Front-end developer responsible for the javascript build of the surrounding hub and integrating/optimising two of the games, working alongside an html/css developer. Responsible for integrating into Disney\'s IUR registration process via Jollywise\'s app api. The site had to support user access via desktop, tablet or smartphone.', 2013, 28, 'monstersuniversity', 1, 1, 0, 0, 1, '2026-02-18 14:45:23', '2013-06-01 12:00:00'),
(58, 'Planes', 'Flash banners in mpu, skyscraper and leaderboard sizes.', 'Flash developer. Built 3 of the 5 rich media executions.', 2013, 27, 'planes', 1, 1, 0, 0, 1, '2026-02-18 14:45:30', '2013-07-01 12:00:00'),
(59, 'Playstation Store', 'Flash banners in mpu, skyscraper and leaderboard sizes. Built for flashtalking platform.', 'Flash Developer. This was a simple production job. The banner templates had been made and I was tasked with producing many of the variations.', 2013, 18, 'playstationstore', 1, 1, 0, 0, 1, '2017-02-09 10:37:23', '2013-04-20 12:00:00'),
(60, 'Monster Match', 'Disney requested a simple javascript \'guess who\' type game that would work on desktop/tablet and smartphones.', 'Front-end developer responsible for the Javascript game component of this microsite.', 2013, 20, 'monstermatch', 1, 1, 0, 0, 1, '2026-02-18 14:45:34', '2013-05-15 12:00:00'),
(61, 'Freelance', 'In 2012 I worked on builds for various clients including Cartoon Network, Disney, Samsung and Nickelodeon.\n\nPlease contact me directly if you need to see specific samples.', 'Front-end developer responsible for several multi-market flash and javascript sites, micro-sites and olm campaigns.', 2012, 1, 'miscellaneous2012', 1, 1, 0, 1, 1, '2017-02-15 15:05:19', '2012-09-01 12:00:00'),
(62, 'Freelance', 'In 2013 I worked on builds for various clients including Cartoon Network, Disney, Samsung and Nickelodeon.\n\nPlease contact me directly if you need to see specific samples.', 'Front-end developer responsible for several multi-market flash and javascript sites, micro-sites and olm campaigns.', 2013, 1, 'miscellaneous2013', 1, 1, 0, 1, 1, '2017-02-09 10:37:23', '2013-01-01 12:00:00'),
(63, 'Freelance', 'In 2014 I worked on builds for various clients.\n\nPlease contact me directly if you need to see specific samples.', 'Front-end developer responsible for several multi-market javascript sites, micro-sites and olm campaigns.', 2014, 1, 'miscellaneous2014', 1, 1, 0, 1, 1, '2017-02-15 14:56:46', '2014-01-01 12:00:00'),
(64, 'Share The Magic', '<p>A seasonal website for Disney&rsquo;s Share the Magic. This year the site was built with html/javascript. It ran two competitions and had a \'letter to Santa\' component.</p>', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer. Responsible for integrating into Disney\'s IUR registration process via Jollywise\'s app api. The site had to support user access via desktop, tablet or smartphone.', 2013, 48, 'stm2013', 1, 1, 0, 0, 1, '2026-02-18 14:45:40', '2013-12-01 12:00:00'),
(65, 'TinkerBell And The Pirate Fairy', 'A short two week project to build a competition based microsite to tie in with the launch of the new Disney film \'TinkerBell and the Pirate Fairy\'.', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer. Responsible for integrating into Disney\'s IUR registration process via Jollywise\'s app api. Part of the competition mechanic involved moderated user image upload that needed to work on IE8. The site had to support user access via desktop, tablet or smartphone.', 2014, 2, 'tbpf', 1, 1, 0, 0, 1, '2026-02-18 14:44:08', '2014-01-15 12:00:00'),
(66, 'Cars Fuel Your Fun', 'A one week project to build a competition and game microsite to tie in with the launch of the Disney Cars \'Fuel Your Fun\' promotion.', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer. Responsible for integrating into Disney\'s IUR registration process via Jollywise\'s app api. The site had to support user access via desktop, tablet or smartphone.', 2014, 6, 'cfuf', 1, 1, 0, 0, 1, '2026-02-18 14:44:11', '2014-02-15 12:00:00'),
(67, 'Bad Neighbours Photobomb', 'A campaign website built to support the launch of the 2014 Bad Neighbours film.', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer. The site had to support user access via desktop, tablet or smartphone.', 2014, 12, 'badneighbourspb', 1, 1, 0, 0, 1, '2026-02-18 14:44:17', '2014-03-01 12:00:00'),
(68, 'Mrs Browns Boys', 'Mrs Brown’s Boys is a hugely popular TV show – with ratings some of the highest seen on British TV and being the most popular show aired during Christmas time with 9.4 million viewers. \r\n\r\nWith the movie on the way, the challenge was creating awareness of the fans of the TV show to the big screen and mobilising them online. ', 'Front-end developer responsible for the javascript build of the surrounding hub and integrating/optimising two (meme machine and get snappy) of the hub elements, working alongside an html/css developer. ', 2014, 20, 'mbb', 1, 1, 0, 0, 1, '2026-02-18 14:44:22', '2014-04-01 12:00:00'),
(69, 'Guardians Of The Galaxy', 'A campaign website, and associated facebook integration, built to support the launch of the 2014 Guardians Of The Galaxy film.', 'Flash Developer, responsible for facebook timeline build.', 2014, 24, 'gotg', 1, 1, 0, 0, 1, '2026-02-18 14:44:27', '2014-05-01 12:00:00'),
(70, 'Share The Magic', '<p>A seasonal website for Disney&rsquo;s Share the Magic. This year the site was built with html/javascript. It ran two competitions and had a \'letter to Santa\' component.</p>', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer. Responsible for integrating into Disney\'s IUR registration process via Jollywise\'s app api. The site had to support user access via desktop, tablet or smartphone.', 2014, 44, 'stm2014', 1, 1, 0, 0, 1, '2026-02-18 14:44:38', '2014-12-01 12:00:00'),
(71, 'Nick Leap', '‘Leap\' was a website designed for Nickelodeon UK with education based learning in mind. The experience invites children into 4 different game worlds, each led by a favourite Nick Jr. character.', 'Front-end developer responsible for the javascript build of two of the game worlds. The site had to support user access via desktop, tablet or smartphone.', 2015, 2, 'nickleap', 1, 1, 0, 0, 1, '2026-02-18 14:42:03', '2015-01-15 12:00:00'),
(72, 'Nomophobia', 'A website built to create an engaging digital campaign to extend ‘nomophobia’ to new audiences. ', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer.', 2015, 24, 'nomophobia', 1, 1, 0, 0, 1, '2026-02-18 14:42:08', '2015-05-01 12:00:00'),
(73, 'Avengers : Age of Ultron', 'A campaign website, and associated facebook integration, built to support the launch of the 2015 Avengers film. This was a simple reskin of the Guardians of the Galaxy version created in 2014.', 'Flash Developer, responsible for facebook timeline build.', 2015, 10, 'avengersaou', 1, 1, 0, 0, 1, '2026-02-18 14:42:12', '2015-02-01 12:00:00'),
(74, 'Imagine 2030', 'A campaign website built to encourage users to submit a meme of how they imagine the world will be in 2030.', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer.', 2015, 18, 'imagine2030', 1, 1, 0, 0, 1, '2026-02-18 14:42:19', '2015-04-01 12:00:00'),
(75, 'Friends And Family', 'An internal Disney promotional website created to enable Disney friends and family members to download promotional vouchers.', 'Front-end developer responsible for the javascript build for this responsive website, working alongside an html/css developer.', 2015, 42, 'fandf', 1, 1, 0, 0, 1, '2026-02-18 14:42:28', '2015-09-01 12:00:00'),
(76, 'Tis the season', 'HTML animated banners in mpu, skyscraper and leaderboard dimensions (300x250, 300x600, 120x600, 160x600, 728x90, 970x250)', 'Front-end developer responsible for the javascript build of all alternative ad unit sizes of these html banners, working from prebuilt 300x600 templates.', 2015, 38, 'tistheseason', 1, 1, 0, 0, 1, '2017-02-22 16:40:26', '2015-06-01 12:00:00'),
(77, 'Broadband Unlimited', 'HTML animated MPU banner - 3 variations.', 'Front-end developer responsible for the javascript build of these html banners, working from psd\'s.', 2015, 40, 'tbyd', 1, 1, 0, 0, 1, '2017-02-22 16:41:41', '2015-07-01 12:00:00'),
(78, ' Tomorrowland', 'Flash (mpu, leaderboard) and html (mpu, overlay) banners, built to promote the launch of the film Tomorrowland. The campaign launched in 11 markets.', 'Flash developer. Built the rich media executions, and handled the doubleclick deployment of both HTML and Flash. This was a challenge as we were supporting 11 markets, and each market had 6 flash and 6 html units, making 132 units that had to be uploaded and setup correctly.', 2015, 16, 'tomorrowlandrich', 1, 1, 0, 0, 1, '2026-02-18 14:42:35', '2015-03-01 12:00:00'),
(79, 'Donation Ads', 'HTML banners in mpu, skyscraper and leaderboard dimensions.', 'Front-end developer responsible for the javascript build of these html banners, working from psd\'s.', 2015, 41, 'donation', 1, 1, 0, 0, 1, '2026-02-18 14:42:43', '2015-08-01 12:00:00'),
(80, 'Zootopia Ads', 'HTML banners in mpu, skyscraper and leaderboard dimensions.', 'Front-end developer responsible for the javascript build of these html banners, working from psd\'s.', 2015, 48, 'zootopia', 1, 1, 0, 0, 1, '2026-02-18 14:42:47', '2015-10-01 12:00:00'),
(81, 'Movies', 'HTML interactive banners in mpu, skyscraper and leaderboard dimensions.', 'Front-end developer responsible for the javascript build of these html banners, working from psd\'s.', 2015, 50, 'movies', 1, 1, 0, 0, 1, '2017-02-22 16:40:14', '2015-12-01 12:00:00'),
(82, 'Dad\'s Army', 'A simple point and click game built to support the launch of the 2016 Dad\'s Army film.', 'Front-end developer responsible for the javascript build for this responsive game.', 2016, 2, 'dadsarmy', 1, 1, 0, 0, 1, '2026-02-18 14:41:19', '2016-01-15 12:00:00'),
(83, 'Freelance', 'In 2015 I worked on builds for various clients.\n\nPlease contact me directly if you need to see specific samples.', 'Front-end developer - various responsibilities.', 2015, 1, 'miscellaneous2015', 1, 1, 0, 1, 1, '2017-02-09 10:37:23', '2015-01-01 12:00:00'),
(84, 'Freelance', 'In 2016 I have worked on builds for various clients.\nPlease contact me directly if you need to see specific samples.', 'Front-end developer - various responsibilities.', 2016, 1, 'miscellaneous2016', 1, 1, 0, 1, 1, '2017-02-09 10:37:23', '2016-01-01 12:00:00'),
(85, 'TinyPop Artpad', '<p>This unity project was inherited from another client. The app was already live on both ios/android app stores. It is a fairly high profile app with a large user install base, but had been receiving bad reviews from users complaining about it not working properly. My job was to get it up and running, make amends, and add additional features, and then deploy to the ios and android app stores.</p> <p>Challenges included first exposure to unity and C#, first in-depth exposure to ios/android development and first in-depth exposure to deployment strategies across both ios and android app stores (certificates, provisioning profiles etc).</p>', '<ul>   <li>Decipher provided source files - no documentation provided.</li>   <li>Amend/fix existing features and add new features.</li>   <li>Integrate existing and new platform specific services (Pushwoosh, SuperAwesome, Localytics, Google Analytics, Facebook).</li>   <li>Deployment : adhoc, testflight and live.</li> </ul>', 2016, 12, 'tinypopartpad', 1, 1, 0, 0, 1, '2026-02-18 14:41:26', '2016-03-15 12:00:00'),
(86, 'TinyPop TV', '<p>This unity project was inherited from another client. It wasn\'t yet published but was 95% feature complete. Jollywise\'s job was to get it up and running, make amends, and add additional features, and then deploy to the ios and android app stores. My job was initial evaluation and to add some of the ios/android platform features. Once I was finished the project was taken over and completed by another developer.</p> <p>Challenges included first exposure to unity and C#, first in-depth exposure to ios/android development and first in-depth exposure to deployment strategies across both ios and android app stores (certificates, provisioning profiles etc).</p>', '<ul>   <li>Decipher provided source files - no documentation provided.</li>   <li>Integrate existing ios specific services (Pushwoosh, SuperAwesome).</li>   <li>Ios setup (certificates, provisioning profiles etc).</li> </ul>', 2016, 10, 'tinypoptv', 1, 1, 0, 0, 1, '2026-02-18 14:41:32', '2016-03-01 12:00:00'),
(87, 'Captain America Civil War', 'HTML banners in mpu, skyscraper and leaderboard dimensions.', 'Front-end developer responsible for the javascript build of all alternative ad unit sizes of these html banners, working from a prebuilt 300x600 template.', 2016, 17, 'capamerads', 1, 1, 0, 0, 1, '2026-02-18 14:41:37', '2016-04-15 22:15:25'),
(88, 'Finding Dory', 'HTML banners in mpu, skyscraper and leaderboard dimensions.', 'Front-end developer responsible for the javascript build of these html banners, working from psd\'s.', 2016, 22, 'dorybanner', 1, 1, 0, 0, 1, '2026-02-18 14:41:42', '2016-06-29 12:15:25'),
(89, 'Adventure Time VR', 'A campaign website built to encourage users to submit on pack promo codes.', 'Front-end developer responsible for the html/css/js build for this responsive website.', 2016, 35, 'atimevr', 1, 1, 0, 0, 1, '2026-02-18 14:41:46', '2016-11-21 09:33:53'),
(90, 'Take it to the Top!', 'A branching dialogue narrative game for 4-12 year olds based on the popular NextStep TV series. The game was built to sit on the CBBC website, and also had to be playable via the new BBC mobile app \'Playtime Island\'.', '<p>Tech Lead responsible for project delivery. The project was split into several streams. The main areas I was involved with were : game editor, game model, game ui.</p>  <ul>     <li>Tech Architecture and game data design</li>     <li>BBC platform integration (BBC jenkins build pipeline and GMI integration)</li>     <li>Devops role developing various project builds using webpack</li>     <li>Game data editor build : Using Babel, Backbone and Marionette</li>     <li>Game dialogue editor integration - using a modified version of <a target=\'_blank\' href=\'https://github.com/InfiniteAmmoInc/Yarn\'>Yarn</a></li>     <li>Game data entry</li>     <li>Managing and co-ordinating the tech deliverables from a team of 3 developers</li> </ul>', 2016, 45, 'nextstep', 1, 1, 0, 0, 1, '2026-02-18 14:41:54', '2016-11-21 10:20:02'),
(91, 'Star Wars', 'HTML banners in mpu, skyscraper and leaderboard dimensions.', 'Front-end developer responsible for the javascript build of these html banners, working from psd\'s.', 2016, 52, 'starwarsrogue', 1, 1, 0, 0, 1, '2026-02-18 14:41:59', '2017-01-12 00:00:00'),
(92, '20th Century Challenge', '<p>The Pathé News 20th Century Challenge was a news trivia family game featuring over 500 film clips and 3000 questions. The British Pathé News archives featured historical film footage from most of the key landmarks in the 20th Century.</p>\n \n<p>The twin CD-ROM repackaged this historic footage to an educative quiz played on the PC. The project took over six months and the final product was available nationally at WH Smiths.</p>', 'Design and programming, CD production.', 1997, 1, 'challenge', 1, 1, 0, 0, 1, '2017-02-15 10:49:52', '2010-02-15 00:00:00'),
(93, 'Fidelity FundsNetwork', '<p>Fidelity wanted to enable private and professional investors to deal in shares and funds; open and tailor ISAs; and manage their entire investment portfolio online.</p>\n \n<p>With a best in class customer experience, Fidelity Funds Supermarket achieved £400 million in new assets under management by June 2001, with, 35% of Fidelity’s direct ISA sales in the UK coming through the website. It was consistently ranked top ISA-providing site.</p>', 'Creative Lead.', 2000, 1, 'fundsnetwork', 1, 1, 0, 0, 1, '2017-02-16 12:56:54', '2010-02-15 00:00:00'),
(94, 'Dancing Groot', 'A campaign website built to to support the launch of the 2017 Guardians Of The Galaxy film.', 'Front-end developer responsible for the html/css/js build for this responsive micro-site.', 2017, 12, 'grootdance', 1, 1, 0, 0, 1, '2026-02-18 14:39:50', '2017-04-09 00:00:00'),
(95, 'Freelance', 'In 2017 I worked on builds for various clients.\r\n\r\nPlease contact me directly if you need to see specific samples.', 'Front-end developer - various responsibilities.', 2017, 1, 'miscellaneous2017', 1, 1, 0, 1, 1, '2018-09-02 22:00:00', '2018-09-03 00:00:00'),
(96, 'Stand up to Bullying', '<p>A standalone chapter of the branching dialogue narrative game for 4-12 year olds based on the popular NextStep TV series. The game was built to sit on the CBBC games website.</p>\r\n<p>Stand up to Bullying sees you join A-Troupe for their latest adventures, navigating the everyday dramas that inevitably arise between characters you know and love from the show.</p>\r\n<p>While the previous chapter introduced the dance troupe in the Studio, this standalone chapter remains in the Studio and explores a bullying theme.</p>', 'Front-end developer, working alongside front-end developer Paul. Together we were responsible for the new chapter build.', 2017, 14, 'nextstepbullying', 1, 1, 0, 0, 1, '2026-02-18 14:39:55', '2018-09-03 22:56:16'),
(97, 'Knock Knock', 'Jollywise is responsible for www.boomerangtv.co.uk. Knock knock is a section of the site that allows users to upload their favourite jokes as audio or text to be showcased in a gallery. Users are able to \'like\' their favourite jokes in the gallery, and a \'joke of the month\' surfaced the most popular submission.', 'Front-end developer responsible for the react/redux build of the gallery and media upload module.', 2017, 17, 'knockknock', 1, 1, 0, 0, 1, '2026-02-18 14:40:52', '2018-09-04 09:33:53'),
(98, 'Let\'s Create', 'Jollywise is responsible for www.boomerangtv.co.uk. Let\'s create is a section of the site that allows users to explore various creative activities and upload their own creations to be showcased in a gallery. Users are able to \'like\' content, and feeds are used to surface \'most popular\', \'trending\' and \'featured\' creations.', 'Front-end developer responsible for the react/redux build of the gallery and media upload module.', 2017, 32, 'letscreate', 1, 1, 0, 0, 1, '2026-02-18 14:40:57', '2018-09-04 09:33:53'),
(99, 'Pet Of The Week', 'Jollywise is responsible for www.boomerangtv.co.uk. Pet of the Week is a section of the site that allows users to explore various pet related activities and upload videos or images of their own pets to be showcased in a gallery. Users are able to \'like\' content, and feeds are used to surface \'most popular\', \'trending\' and \'featured\' pets.', 'Front-end developer responsible for the react/redux build of the gallery and media upload module.', 2017, 18, 'potw', 1, 1, 0, 0, 1, '2026-02-18 14:41:04', '2018-09-04 09:33:53');
INSERT INTO `entries` (`entry_id`, `entry_title`, `entry_description`, `entry_responsibilities`, `entry_year`, `entry_week`, `entry_key`, `entry_isactive`, `entry_isfeatured`, `entry_isnda`, `entry_issummary`, `entry_isresponsive`, `ModifiedTime`, `CreatedTime`) VALUES
(100, 'Take it to the Beach!', '<p>The second chapter of the branching dialogue narrative game for 4-12 year olds based on the popular NextStep TV series. The game was built to sit on the CBBC games website.</p>\r\n<p>Take it to the Beach! sees you join A-Troupe for their latest adventures, navigating the everyday dramas that inevitably arise between characters you know and love from the show.</p>\r\n<p>While the previous chapter introduced the dance troupe in the Studio, Chapter 2 invites you all the way to the Beach.</p>', 'Front-end developer, working alongside front-end developer Paul. Together we were responsible for the new chapter build.', 2017, 28, 'nextstep_v2', 1, 1, 0, 0, 1, '2026-02-18 14:41:13', '2018-09-04 22:56:16'),
(101, 'Take it to Paris!', '<p>The third and final chapter of the branching dialogue narrative game for 4-12 year olds based on the popular NextStep TV series. The game was built to sit on the CBBC games website.</p>\r\n<p>Take it to Paris! sees you join A-Troupe for their latest adventures, navigating the everyday dramas that inevitably arise between characters you know and love from the show.</p>\r\n<p>While previous chapters have taken the dance troupe from the studio to the beach, Chapter 3 invites you all the way to Paris for some of the biggest challenges yet.</p>', 'Front-end developer, working alongside front-end developer Paul. Together we were responsible for the new chapter build.', 2018, 8, 'nextstep_v3', 1, 1, 0, 0, 1, '2026-02-18 14:37:37', '2018-09-04 22:56:16'),
(102, 'Horrible Histories', '<p>A game for 4-12 year olds based on the popular Horrible Histories TV series. The game was built to sit on the CBBC games website, and was also designed to be packaged as an App for all mobile platforms, served up into mobile browsers.</p>', 'Front-end developer, working alongside front-end developer Paul. Together we were responsible for the build. Paul created the framework, and between us we built the 29 minigames currently playable.', 2018, 25, 'horriblehistories', 1, 1, 0, 0, 1, '2026-02-18 14:39:35', '2018-09-04 00:00:00'),
(103, 'Return to Lender', '<p>With every school summer holiday comes the annual Summer Reading Challenge, coordinated by The Reading Agency in partnership with public libraries across the UK. It’s a simple yet brilliant concept – kids sign up for free at their local library, then read six books of their choice over the summer holidays to collect rewards and complete the challenge.</p>\r\n<p>This year, the theme ‘Mischief Makers’ has seen the SRC taken over by Dennis and Gnasher – not to mention all your other Beanotown favourites. Kids sign up to get their very own map of Beanotown, collecting stickers with every book read to find the location of a hidden treasure chest. What’s more, we have a brand-new game up on the Beano website, so they can help Dennis return his overdue library books without getting caught!</p>', 'Front-end developer responsible for the javascript Phaser build of the UI for this responsive micro-site.', 2018, 20, 'beanlender', 1, 1, 0, 0, 1, '2026-02-18 14:39:42', '2018-09-04 00:00:00');

--
-- Triggers `entries`
--
DELIMITER $$
CREATE TRIGGER `entries_insert_trigger` BEFORE INSERT ON `entries` FOR EACH ROW BEGIN
IF NEW.CreatedTime = '0000-00-00 00:00:00' THEN
SET NEW.CreatedTime = NOW();
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `entries_affiliations`
--

CREATE TABLE `entries_affiliations` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `affiliation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_affiliations`
--

INSERT INTO `entries_affiliations` (`id`, `entry_id`, `affiliation_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1),
(16, 16, 1),
(17, 17, 1),
(18, 18, 1),
(19, 19, 1),
(20, 20, 1),
(21, 21, 1),
(22, 22, 3),
(23, 23, 1),
(24, 24, 1),
(25, 25, 1),
(26, 26, 1),
(27, 27, 2),
(28, 28, 2),
(29, 29, 2),
(30, 30, 2),
(31, 31, 2),
(32, 32, 2),
(33, 33, 4),
(34, 34, 4),
(35, 35, 1),
(36, 36, 1),
(37, 37, 1),
(38, 38, 1),
(39, 39, 1),
(40, 40, 1),
(41, 41, 2),
(42, 42, 2),
(43, 43, 2),
(44, 44, 2),
(45, 45, 5),
(46, 46, 1),
(47, 47, 6),
(48, 49, 7),
(49, 50, 7),
(50, 51, 7),
(51, 52, 7),
(52, 53, 7),
(53, 54, 7),
(54, 55, 7),
(55, 56, 7),
(56, 57, 7),
(57, 58, 7),
(58, 59, 8),
(59, 60, 7),
(60, 61, 7),
(61, 62, 7),
(62, 63, 7),
(63, 64, 7),
(64, 65, 7),
(65, 66, 7),
(66, 67, 7),
(67, 68, 7),
(68, 69, 7),
(69, 70, 7),
(70, 71, 7),
(71, 72, 7),
(72, 73, 7),
(73, 74, 7),
(74, 75, 7),
(75, 76, 8),
(76, 77, 8),
(77, 78, 7),
(78, 79, 7),
(79, 80, 7),
(80, 81, 8),
(81, 82, 7),
(82, 83, 7),
(83, 84, 7),
(84, 87, 7),
(85, 85, 7),
(86, 86, 7),
(87, 88, 7),
(88, 89, 7),
(89, 90, 7),
(90, 91, 7),
(91, 92, 9),
(92, 93, 4),
(93, 94, 7),
(94, 95, 7),
(95, 96, 7),
(96, 97, 7),
(97, 98, 7),
(98, 99, 7),
(99, 100, 7),
(100, 101, 7),
(101, 102, 7),
(102, 103, 7);

-- --------------------------------------------------------

--
-- Table structure for table `entries_awards`
--

CREATE TABLE `entries_awards` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `award_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_awards`
--

INSERT INTO `entries_awards` (`id`, `entry_id`, `award_id`) VALUES
(1, 9, 1),
(2, 10, 2),
(3, 10, 3),
(4, 12, 4),
(5, 13, 5),
(6, 13, 6),
(7, 24, 7),
(8, 25, 8),
(9, 25, 9),
(10, 25, 10),
(11, 43, 11),
(12, 43, 12),
(13, 43, 13),
(14, 71, 14);

-- --------------------------------------------------------

--
-- Table structure for table `entries_categories`
--

CREATE TABLE `entries_categories` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_categories`
--

INSERT INTO `entries_categories` (`id`, `entry_id`, `category_id`) VALUES
(1, 1, 4),
(2, 2, 1),
(3, 3, 1),
(4, 4, 5),
(5, 5, 5),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1),
(16, 16, 5),
(17, 17, 5),
(18, 18, 5),
(19, 19, 5),
(20, 20, 5),
(21, 21, 5),
(22, 22, 1),
(23, 23, 1),
(24, 24, 5),
(25, 25, 5),
(26, 26, 1),
(27, 27, 1),
(28, 28, 1),
(29, 29, 1),
(30, 30, 5),
(31, 31, 5),
(32, 32, 1),
(33, 33, 1),
(34, 34, 1),
(35, 35, 2),
(36, 36, 2),
(37, 37, 2),
(38, 38, 2),
(39, 39, 2),
(40, 40, 2),
(41, 41, 2),
(42, 42, 2),
(43, 43, 2),
(44, 44, 2),
(45, 45, 2),
(46, 47, 5),
(47, 46, 1),
(48, 49, 1),
(49, 50, 1),
(50, 51, 2),
(51, 52, 1),
(52, 53, 1),
(53, 54, 1),
(54, 55, 2),
(55, 56, 1),
(56, 57, 1),
(57, 58, 2),
(58, 59, 2),
(59, 60, 5),
(60, 61, 1),
(61, 62, 1),
(62, 63, 1),
(63, 64, 1),
(64, 65, 1),
(65, 66, 1),
(66, 67, 1),
(67, 68, 1),
(68, 69, 1),
(69, 70, 1),
(70, 71, 1),
(71, 71, 3),
(72, 72, 1),
(73, 73, 1),
(74, 74, 1),
(75, 75, 1),
(76, 76, 2),
(77, 77, 2),
(78, 78, 2),
(79, 79, 2),
(80, 80, 2),
(81, 81, 2),
(82, 82, 5),
(83, 83, 1),
(84, 84, 1),
(85, 85, 6),
(86, 86, 6),
(87, 87, 2),
(88, 57, 3),
(89, 64, 3),
(90, 65, 3),
(91, 66, 3),
(92, 67, 3),
(93, 68, 3),
(94, 72, 3),
(95, 74, 3),
(96, 75, 3),
(97, 82, 3),
(98, 70, 3),
(99, 88, 2),
(100, 89, 1),
(101, 89, 3),
(102, 90, 1),
(103, 90, 5),
(104, 90, 3),
(105, 90, 6),
(106, 91, 2),
(107, 92, 6),
(108, 92, 5),
(109, 93, 1),
(110, 34, 5),
(111, 94, 1),
(112, 94, 3),
(113, 95, 1),
(114, 96, 1),
(115, 96, 6),
(116, 96, 5),
(117, 96, 3),
(118, 97, 1),
(119, 97, 3),
(120, 98, 1),
(121, 98, 3),
(122, 99, 1),
(123, 99, 3),
(124, 100, 1),
(125, 100, 5),
(126, 100, 3),
(127, 101, 1),
(128, 101, 5),
(129, 101, 3),
(130, 102, 6),
(131, 102, 5),
(132, 102, 1),
(133, 102, 3),
(134, 103, 5),
(135, 103, 1),
(136, 103, 3);

-- --------------------------------------------------------

--
-- Table structure for table `entries_clients`
--

CREATE TABLE `entries_clients` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_clients`
--

INSERT INTO `entries_clients` (`id`, `entry_id`, `client_id`) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 4),
(4, 4, 1),
(5, 5, 1),
(6, 6, 5),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 6),
(11, 11, 7),
(12, 12, 6),
(13, 13, 8),
(14, 14, 9),
(15, 15, 9),
(16, 16, 6),
(17, 17, 1),
(18, 18, 1),
(19, 19, 1),
(20, 20, 1),
(21, 21, 1),
(22, 22, 10),
(23, 23, 11),
(24, 24, 6),
(25, 25, 6),
(26, 26, 12),
(27, 27, 13),
(28, 28, 14),
(29, 29, 14),
(30, 30, 15),
(31, 31, 15),
(32, 32, 16),
(33, 33, 17),
(34, 34, 18),
(35, 35, 3),
(36, 36, 3),
(37, 37, 3),
(38, 38, 6),
(39, 39, 3),
(40, 40, 7),
(41, 41, 7),
(42, 42, 6),
(43, 43, 20),
(44, 44, 16),
(45, 45, 21),
(46, 46, 22),
(47, 47, 23),
(48, 49, 25),
(49, 50, 26),
(50, 51, 26),
(51, 52, 25),
(52, 53, 25),
(53, 54, 27),
(54, 55, 26),
(55, 56, 25),
(56, 57, 28),
(57, 58, 26),
(58, 59, 29),
(59, 60, 26),
(60, 61, 24),
(61, 62, 24),
(62, 63, 24),
(63, 64, 26),
(64, 65, 26),
(65, 66, 26),
(66, 67, 30),
(68, 68, 30),
(69, 69, 26),
(70, 70, 26),
(71, 71, 27),
(72, 72, 31),
(73, 73, 26),
(74, 74, 32),
(75, 75, 26),
(76, 76, 33),
(77, 77, 3),
(78, 78, 26),
(79, 79, 32),
(80, 80, 26),
(81, 81, 3),
(82, 82, 30),
(83, 83, 24),
(84, 84, 24),
(85, 87, 26),
(86, 85, 29),
(87, 86, 29),
(88, 88, 26),
(89, 89, 34),
(90, 90, 35),
(91, 91, 26),
(92, 92, 36),
(93, 93, 37),
(94, 94, 26),
(95, 95, 24),
(96, 96, 35),
(97, 97, 34),
(98, 98, 34),
(99, 99, 34),
(100, 100, 35),
(101, 101, 35),
(102, 102, 35),
(103, 103, 38);

-- --------------------------------------------------------

--
-- Table structure for table `entries_frameworks`
--

CREATE TABLE `entries_frameworks` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `framework_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_frameworks`
--

INSERT INTO `entries_frameworks` (`id`, `entry_id`, `framework_id`) VALUES
(1, 1, 3),
(2, 1, 4),
(3, 2, 2),
(4, 3, 1),
(5, 4, 2),
(6, 5, 2),
(7, 6, 2),
(8, 9, 5),
(9, 46, 1),
(10, 49, 1),
(11, 50, 1),
(12, 52, 1),
(13, 53, 1),
(14, 54, 6),
(15, 54, 7),
(16, 56, 1),
(17, 60, 6),
(18, 61, 1),
(19, 61, 6),
(20, 62, 1),
(21, 62, 6),
(22, 63, 6),
(23, 64, 6),
(24, 65, 6),
(25, 66, 6),
(26, 67, 6),
(27, 72, 8),
(28, 72, 9),
(29, 72, 10),
(30, 74, 8),
(31, 74, 10),
(32, 75, 8),
(33, 75, 9),
(34, 75, 10),
(35, 76, 11),
(36, 77, 12),
(37, 81, 12),
(38, 80, 11),
(39, 82, 13),
(40, 88, 11),
(41, 89, 8),
(42, 89, 9),
(43, 90, 14),
(44, 90, 15),
(45, 94, 16),
(46, 94, 17),
(47, 96, 14),
(48, 96, 15),
(49, 97, 16),
(50, 97, 18),
(51, 98, 16),
(52, 98, 18),
(53, 99, 16),
(54, 99, 18),
(55, 100, 14),
(56, 100, 15),
(57, 101, 14),
(58, 101, 15),
(59, 102, 13),
(60, 103, 13);

-- --------------------------------------------------------

--
-- Table structure for table `entries_images`
--

CREATE TABLE `entries_images` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_images`
--

INSERT INTO `entries_images` (`id`, `entry_id`, `image_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 3, 4),
(5, 4, 5),
(6, 5, 6),
(7, 6, 7),
(8, 7, 8),
(9, 8, 9),
(10, 9, 10),
(11, 10, 11),
(12, 10, 12),
(13, 11, 13),
(14, 12, 14),
(15, 12, 15),
(16, 13, 16),
(17, 13, 17),
(18, 14, 18),
(19, 15, 19),
(20, 16, 20),
(21, 17, 21),
(22, 18, 22),
(23, 19, 23),
(24, 20, 24),
(25, 21, 25),
(26, 22, 26),
(27, 23, 27),
(28, 24, 28),
(29, 25, 29),
(30, 28, 35),
(31, 25, 30),
(32, 26, 32),
(33, 27, 33),
(34, 25, 31),
(35, 27, 34),
(36, 29, 36),
(37, 30, 37),
(38, 31, 38),
(39, 32, 39),
(40, 33, 40),
(41, 34, 41),
(42, 35, 42),
(43, 35, 43),
(44, 36, 44),
(45, 37, 45),
(46, 37, 46),
(47, 38, 47),
(48, 39, 48),
(49, 40, 49),
(50, 41, 50),
(51, 42, 51),
(52, 43, 52),
(53, 44, 53),
(54, 44, 54),
(55, 32, 55),
(56, 45, 59),
(57, 45, 60),
(58, 45, 61),
(59, 45, 57),
(60, 45, 58),
(61, 45, 56),
(62, 9, 62),
(63, 44, 63),
(64, 42, 64),
(65, 42, 65),
(66, 36, 66),
(67, 36, 67),
(68, 36, 68),
(69, 36, 69),
(70, 37, 70),
(71, 37, 71),
(72, 39, 72),
(73, 41, 73),
(74, 30, 74),
(75, 31, 75),
(76, 18, 76),
(77, 20, 77),
(78, 19, 78),
(79, 16, 79),
(80, 14, 80),
(81, 14, 81),
(82, 15, 82),
(83, 15, 83),
(84, 4, 86),
(85, 5, 84),
(86, 5, 85),
(87, 22, 87),
(88, 22, 88),
(89, 46, 89),
(90, 47, 90),
(91, 47, 91),
(92, 39, 92),
(93, 49, 98),
(94, 49, 99),
(95, 49, 100),
(96, 49, 101),
(97, 50, 102),
(98, 50, 103),
(99, 50, 104),
(100, 50, 105),
(101, 50, 106),
(102, 51, 107),
(103, 51, 108),
(104, 52, 109),
(105, 52, 110),
(106, 52, 111),
(107, 53, 112),
(108, 53, 113),
(109, 53, 114),
(110, 53, 115),
(111, 54, 116),
(112, 53, 117),
(113, 55, 119),
(114, 55, 118),
(115, 55, 120),
(116, 55, 121),
(117, 56, 122),
(118, 56, 123),
(119, 56, 124),
(120, 56, 125),
(121, 57, 126),
(122, 57, 127),
(123, 57, 128),
(124, 57, 129),
(125, 57, 130),
(126, 58, 131),
(127, 58, 132),
(128, 58, 133),
(129, 59, 134),
(130, 59, 135),
(131, 59, 136),
(132, 59, 137),
(133, 59, 138),
(134, 60, 139),
(135, 60, 140),
(136, 60, 141),
(137, 64, 143),
(138, 64, 144),
(139, 64, 145),
(140, 64, 146),
(141, 64, 147),
(142, 64, 148),
(143, 64, 149),
(144, 65, 150),
(145, 65, 151),
(146, 65, 152),
(147, 65, 153),
(148, 65, 154),
(149, 65, 155),
(150, 46, 156);

-- --------------------------------------------------------

--
-- Table structure for table `entries_links`
--

CREATE TABLE `entries_links` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_links`
--

INSERT INTO `entries_links` (`id`, `entry_id`, `link_id`) VALUES
(1, 59, 67),
(5, 47, 56),
(7, 39, 46),
(8, 1, 53),
(10, 49, 57),
(13, 52, 61),
(14, 47, 62),
(15, 53, 65),
(16, 56, 63),
(18, 60, 68),
(19, 47, 69),
(20, 47, 70);

-- --------------------------------------------------------

--
-- Table structure for table `entries_platforms`
--

CREATE TABLE `entries_platforms` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `platform_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_platforms`
--

INSERT INTO `entries_platforms` (`id`, `entry_id`, `platform_id`) VALUES
(1, 66, 1),
(2, 66, 2),
(3, 66, 3),
(4, 82, 1),
(5, 82, 2),
(6, 82, 3);

-- --------------------------------------------------------

--
-- Table structure for table `entries_technologies`
--

CREATE TABLE `entries_technologies` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `tech_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_technologies`
--

INSERT INTO `entries_technologies` (`id`, `entry_id`, `tech_id`) VALUES
(1, 1, 1),
(2, 1, 6),
(3, 2, 8),
(4, 3, 8),
(5, 4, 8),
(6, 5, 8),
(7, 6, 8),
(8, 7, 8),
(9, 8, 8),
(10, 9, 8),
(11, 10, 8),
(12, 11, 9),
(13, 12, 9),
(14, 13, 9),
(15, 14, 9),
(16, 15, 9),
(17, 16, 9),
(18, 17, 9),
(19, 18, 9),
(20, 19, 9),
(21, 20, 9),
(22, 21, 9),
(23, 22, 10),
(24, 23, 10),
(25, 24, 10),
(26, 25, 10),
(27, 26, 10),
(28, 27, 10),
(29, 28, 10),
(30, 29, 10),
(31, 30, 10),
(32, 31, 11),
(33, 32, 10),
(34, 33, 10),
(35, 34, 11),
(36, 35, 9),
(37, 36, 9),
(38, 37, 9),
(39, 38, 9),
(40, 39, 9),
(41, 40, 9),
(42, 41, 10),
(43, 42, 10),
(44, 43, 10),
(45, 44, 10),
(46, 1, 7),
(47, 45, 9),
(48, 46, 8),
(49, 46, 3),
(50, 47, 12),
(51, 49, 8),
(52, 49, 7),
(53, 50, 8),
(54, 50, 7),
(55, 51, 8),
(56, 51, 2),
(57, 52, 8),
(58, 52, 7),
(59, 53, 8),
(60, 53, 7),
(61, 54, 7),
(62, 55, 8),
(63, 56, 8),
(64, 57, 7),
(65, 57, 1),
(66, 57, 6),
(67, 58, 3),
(68, 58, 8),
(69, 59, 3),
(70, 59, 8),
(71, 60, 1),
(72, 60, 7),
(73, 60, 6),
(74, 61, 8),
(75, 61, 3),
(76, 61, 1),
(77, 61, 7),
(78, 61, 13),
(79, 61, 6),
(80, 61, 2),
(81, 62, 7),
(82, 62, 1),
(83, 62, 6),
(84, 62, 2),
(85, 62, 13),
(86, 62, 8),
(87, 62, 3),
(88, 63, 1),
(89, 63, 2),
(90, 63, 6),
(91, 63, 7),
(92, 64, 1),
(93, 64, 7),
(94, 64, 6),
(95, 65, 1),
(96, 65, 7),
(97, 65, 6),
(98, 66, 1),
(99, 66, 7),
(100, 66, 6),
(101, 67, 1),
(102, 67, 7),
(103, 67, 6),
(104, 69, 8),
(105, 69, 13),
(108, 72, 7),
(109, 72, 1),
(110, 73, 8),
(111, 73, 13),
(112, 74, 7),
(113, 74, 1),
(114, 75, 7),
(115, 75, 1),
(116, 76, 1),
(117, 76, 7),
(118, 76, 6),
(119, 77, 1),
(120, 77, 7),
(121, 79, 1),
(122, 79, 7),
(123, 79, 6),
(124, 78, 3),
(125, 78, 8),
(126, 80, 1),
(127, 80, 6),
(128, 80, 7),
(129, 81, 1),
(130, 81, 6),
(131, 81, 7),
(132, 82, 1),
(133, 82, 6),
(134, 82, 7),
(135, 85, 14),
(136, 86, 14),
(137, 87, 1),
(138, 87, 6),
(139, 87, 7),
(140, 85, 15),
(141, 85, 16),
(142, 86, 15),
(143, 86, 16),
(144, 88, 1),
(145, 88, 6),
(146, 88, 7),
(147, 89, 1),
(148, 89, 6),
(149, 89, 7),
(150, 90, 1),
(151, 90, 6),
(152, 90, 7),
(153, 91, 1),
(154, 91, 7),
(155, 91, 6),
(156, 92, 11),
(157, 94, 1),
(158, 94, 7),
(159, 94, 6),
(160, 96, 1),
(161, 96, 6),
(162, 96, 7),
(163, 97, 1),
(164, 97, 6),
(165, 97, 7),
(166, 98, 1),
(167, 98, 6),
(168, 98, 7),
(169, 99, 1),
(170, 99, 6),
(171, 99, 7),
(172, 100, 1),
(173, 100, 6),
(174, 100, 7),
(175, 101, 1),
(176, 101, 6),
(177, 101, 7),
(178, 102, 1),
(179, 102, 6),
(180, 102, 7),
(181, 103, 1),
(182, 103, 6),
(183, 103, 7);

-- --------------------------------------------------------

--
-- Table structure for table `entries_territories`
--

CREATE TABLE `entries_territories` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `territory_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_territories`
--

INSERT INTO `entries_territories` (`id`, `entry_id`, `territory_id`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 1),
(4, 5, 1),
(5, 6, 2),
(6, 6, 3),
(7, 7, 1),
(8, 8, 1),
(9, 9, 2),
(10, 10, 1),
(11, 11, 1),
(12, 12, 2),
(13, 13, 2),
(14, 13, 4),
(15, 13, 5),
(16, 14, 1),
(17, 15, 1),
(18, 16, 1),
(19, 17, 2),
(20, 17, 4),
(21, 17, 6),
(22, 18, 1),
(23, 19, 1),
(24, 20, 1),
(25, 21, 1),
(26, 22, 2),
(27, 22, 4),
(28, 23, 2),
(29, 24, 1),
(30, 25, 1),
(31, 26, 2),
(32, 27, 1),
(33, 28, 1),
(34, 29, 1),
(35, 30, 1),
(36, 31, 1),
(37, 32, 2),
(38, 33, 2),
(39, 34, 1),
(40, 35, 1),
(41, 36, 1),
(42, 37, 1),
(43, 38, 2),
(44, 39, 1),
(45, 40, 1),
(46, 41, 1),
(47, 42, 1),
(48, 43, 1),
(49, 44, 2),
(50, 45, 2),
(51, 47, 1),
(52, 49, 1),
(53, 50, 2),
(54, 50, 4),
(55, 50, 5),
(56, 50, 7),
(57, 50, 8),
(58, 50, 9),
(59, 50, 10),
(60, 51, 2),
(61, 52, 1),
(62, 53, 1),
(63, 55, 2),
(64, 55, 4),
(65, 55, 12),
(66, 55, 13),
(67, 55, 14),
(68, 56, 1),
(69, 57, 2),
(70, 57, 7),
(71, 57, 4),
(72, 57, 5),
(73, 57, 9),
(74, 58, 2),
(75, 59, 2),
(76, 59, 5),
(77, 59, 4),
(78, 60, 3),
(79, 61, 1),
(80, 62, 1),
(81, 64, 15),
(82, 70, 15),
(83, 69, 2),
(84, 69, 5),
(85, 69, 7),
(86, 69, 3),
(87, 72, 2),
(88, 73, 2),
(89, 73, 3),
(90, 79, 2),
(91, 76, 2),
(92, 77, 2),
(93, 80, 2),
(94, 81, 2),
(95, 82, 2),
(96, 85, 2),
(97, 86, 2),
(98, 87, 2),
(99, 88, 2),
(100, 89, 2),
(101, 90, 2),
(102, 91, 2),
(103, 92, 1),
(104, 96, 2),
(105, 97, 1),
(106, 98, 1),
(107, 99, 1),
(108, 100, 2),
(109, 101, 2),
(110, 102, 2),
(111, 103, 2);

-- --------------------------------------------------------

--
-- Table structure for table `entries_videos`
--

CREATE TABLE `entries_videos` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `entries_videos`
--

INSERT INTO `entries_videos` (`id`, `entry_id`, `video_id`) VALUES
(1, 47, 1);

-- --------------------------------------------------------

--
-- Table structure for table `frameworks`
--

CREATE TABLE `frameworks` (
  `framework_id` int(11) NOT NULL,
  `framework_name` varchar(30) NOT NULL,
  `framework_url` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `frameworks`
--

INSERT INTO `frameworks` (`framework_id`, `framework_name`, `framework_url`) VALUES
(1, 'Robotlegs', 'http://www.robotlegs.org/'),
(2, 'PureMVC', 'http://www.puremvc.org/'),
(3, 'JQTouch', 'http://jqtouch.com/'),
(4, 'PhoneGap', 'http://www.phonegap.com'),
(5, 'inhouse MVC', ''),
(6, 'JQuery', 'http://jquery.com'),
(7, 'Mustache', 'http://mustache.github.io'),
(8, 'Backbone', 'http://backbonejs.org'),
(9, 'Marionette', 'http://marionettejs.com'),
(10, 'Handlebars', 'http://handlebarsjs.com/'),
(11, 'Greensock GSAP', 'https://greensock.com/gsap'),
(12, 'EaselJS', 'http://www.createjs.com/easeljs'),
(13, 'Phaser', 'http://phaser.io/'),
(14, 'Babel', 'https://babeljs.io'),
(15, 'Vue.js', 'https://vuejs.org'),
(16, 'React', 'https://facebook.github.io/react/'),
(17, 'Pixi', 'http://www.pixijs.com/'),
(18, 'Redux', 'https://redux.js.org/');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `image_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `image_name`) VALUES
(1, 'kraftprototype.jpg'),
(2, 'inteliip.jpg'),
(3, 'mastercardcarousel01.jpg'),
(4, 'mastercardcarousel02.jpg'),
(5, 'intelinsidethegamepathfinding01.jpg'),
(6, 'intelinsidethegameparticles01.jpg'),
(7, 'mrmworks.jpg'),
(8, 'intelgameon2010.jpg'),
(9, 'intelgameon2008.jpg'),
(10, 'intelstudio01.jpg'),
(11, 'msnminimiseme01.jpg'),
(12, 'msnminimiseme02.jpg'),
(13, 'microsoftdynamics.jpg'),
(14, 'msnvideoviral01.jpg'),
(15, 'msnvideoviral02.jpg'),
(16, 'upswidget01.jpg'),
(17, 'upswidget02.jpg'),
(18, 'unileverheartbrand01.jpg'),
(19, 'unileverkidsfun01.jpg'),
(20, 'msnsearchladder01.jpg'),
(21, 'intelvprocompetition.jpg'),
(22, 'intelitmgdynamicduo01.jpg'),
(23, 'intelitmgpcmeltdown01.jpg'),
(24, 'intelitmghackerinvasion01.jpg'),
(25, 'intelitmgceo.jpg'),
(26, 'louboutinboutique01.jpg'),
(27, 'magnumsenses.jpg'),
(28, 'msnsearchsupremo.jpg'),
(29, 'msnkittycaper01.jpg'),
(30, 'msnkittycaper02.jpg'),
(31, 'msnkittycaper03.jpg'),
(32, 'peugeotsmartnav.jpg'),
(33, 'opeltigra01.jpg'),
(34, 'opeltigra02.jpg'),
(35, 'hpf1dynamicscreensaver.jpg'),
(36, 'hpf1interactivecar.jpg'),
(37, 'nesquikplus01.jpg'),
(38, 'nesquikhopalong01.jpg'),
(39, 'natwestadvantagegold01.jpg'),
(40, 'miniavengers.jpg'),
(41, 'birdseyecontinent.jpg'),
(42, 'skyhdplus01.jpg'),
(43, 'skyhdplus02.jpg'),
(44, 'skyrcc01.jpg'),
(45, 'skyhd01.jpg'),
(46, 'skyhd02.jpg'),
(47, 'msnvideowall.jpg'),
(48, 'skykeyhole01.jpg'),
(49, 'microsoftbcc.jpg'),
(50, 'microsoftdiver01.jpg'),
(51, 'msnhotmail01.jpg'),
(52, 'tourismirelandwindows.jpg'),
(53, 'natwestag01.jpg'),
(54, 'natwestag02.jpg'),
(55, 'natwestadvantagegold02.jpg'),
(56, 'betgeniusvarious06.jpg'),
(57, 'betgeniusvarious04.jpg'),
(58, 'betgeniusvarious05.jpg'),
(59, 'betgeniusvarious01.jpg'),
(60, 'betgeniusvarious02.jpg'),
(61, 'betgeniusvarious03.jpg'),
(62, 'intelstudio02.jpg'),
(63, 'natwestag03.jpg'),
(64, 'msnhotmail02.jpg'),
(65, 'msnhotmail03.jpg'),
(66, 'skyrcc02.jpg'),
(67, 'skyrcc03.jpg'),
(68, 'skyrcc04.jpg'),
(69, 'skyrcc05.jpg'),
(70, 'skyhd03.jpg'),
(71, 'skyhd04.jpg'),
(72, 'skykeyhole02.jpg'),
(73, 'microsoftdiver02.jpg'),
(74, 'nesquikplus02.jpg'),
(75, 'nesquikhopalong02.jpg'),
(76, 'intelitmgdynamicduo02.jpg'),
(77, 'intelitmghackerinvasion02.jpg'),
(78, 'intelitmgpcmeltdown02.jpg'),
(79, 'msnsearchladder02.jpg'),
(80, 'unileverheartbrand02.jpg'),
(81, 'unileverheartbrand03.jpg'),
(82, 'unileverkidsfun02.jpg'),
(83, 'unileverkidsfun03.jpg'),
(84, 'intelinsidethegameparticles02.jpg'),
(85, 'intelinsidethegameparticles03.jpg'),
(86, 'intelinsidethegamepathfinding02.jpg'),
(87, 'louboutinboutique02.jpg'),
(88, 'louboutinboutique03.jpg'),
(89, 'alicometlife.jpg'),
(90, 'aniroggameinserts.jpg'),
(91, 'anirogskramble.jpg'),
(92, 'skykeyhole03.jpg'),
(98, 'cartoonnetworkbenten01.jpg'),
(99, 'cartoonnetworkbenten02.jpg'),
(100, 'cartoonnetworkbenten03.jpg'),
(101, 'cartoonnetworkbenten04.jpg'),
(102, 'disneyxmasstore01.jpg'),
(103, 'disneyxmasstore02.jpg'),
(104, 'disneyxmasstore03.jpg'),
(105, 'disneyxmasstore04.jpg'),
(106, 'disneyxmasstore05.jpg'),
(107, 'disneyepicmickey01.jpg'),
(108, 'disneyepicmickey02.jpg'),
(109, 'cartoonnetworkbentenrepack01.jpg'),
(110, 'cartoonnetworkbentenrepack02.jpg'),
(111, 'cartoonnetworkbentenrepack03.jpg'),
(112, 'cartoonnetworkunlock01.jpg'),
(113, 'cartoonnetworkunlock02.jpg'),
(114, 'cartoonnetworkunlock03.jpg'),
(115, 'cartoonnetworkunlock04.jpg'),
(116, 'nickelodeonchimpquiz01.jpg'),
(117, 'cartoonnetworkunlock05.jpg'),
(118, 'disneyironman3it01.jpg'),
(119, 'disneyironman3it02.jpg'),
(120, 'disneyironman3it03.jpg'),
(121, 'disneyironman3it04.jpg'),
(122, 'cartoonnetworkunlockrepack01.jpg'),
(123, 'cartoonnetworkunlockrepack02.jpg'),
(124, 'cartoonnetworkunlockrepack03.jpg'),
(125, 'cartoonnetworkunlockrepack04.jpg'),
(126, 'samsungmonstersuniversity01.jpg'),
(127, 'samsungmonstersuniversity02.jpg'),
(128, 'samsungmonstersuniversity03.jpg'),
(129, 'samsungmonstersuniversity04.jpg'),
(130, 'samsungmonstersuniversity05.jpg'),
(131, 'disneyplanes01.jpg'),
(132, 'disneyplanes02.jpg'),
(133, 'disneyplanes03.jpg'),
(134, 'sonyplaystationstore01.jpg'),
(135, 'sonyplaystationstore02.jpg'),
(136, 'sonyplaystationstore03.jpg'),
(137, 'sonyplaystationstore04.jpg'),
(138, 'sonyplaystationstore05.jpg'),
(139, 'disneymonstermatch01.jpg'),
(140, 'disneymonstermatch02.jpg'),
(141, 'disneymonstermatch03.jpg'),
(143, 'disneystm2013_01.jpg'),
(144, 'disneystm2013_02.jpg'),
(145, 'disneystm2013_03.jpg'),
(146, 'disneystm2013_04.jpg'),
(147, 'disneystm2013_05.jpg'),
(148, 'disneystm2013_06.jpg'),
(149, 'disneystm2013_07.jpg'),
(150, 'disneytbpf01.jpg'),
(151, 'disneytbpf02.jpg'),
(152, 'disneytbpf03.jpg'),
(153, 'disneytbpf04.jpg'),
(154, 'disneytbpf05.jpg'),
(155, 'disneytbpf06.jpg'),
(156, 'alicometlife-processflow.png');

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `link_id` int(11) NOT NULL,
  `link_url` text NOT NULL,
  `link_target` text NOT NULL,
  `link_type` int(11) NOT NULL,
  `window_width` int(11) NOT NULL,
  `window_height` int(11) NOT NULL,
  `link_label` text NOT NULL,
  `link_isMobileFriendly` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`link_id`, `link_url`, `link_target`, `link_type`, `window_width`, `window_height`, `link_label`, `link_isMobileFriendly`) VALUES
(8, 'http://www.mrmworkstraining.com/video.htm?module=0', '', 1, 1080, 800, '', 0),
(10, 'http://game-on.intel.com/eng/default.aspx', '', 1, 0, 0, '', 0),
(46, 'http://www.flashtalking.com/skyKeyhole/', '', 2, 0, 0, 'Flashtalking', 0),
(53, '/media/prototype/kraft/prototype/', '_blank', 2, 320, 480, '', 0),
(56, 'http://www.mobygames.com/game/vic-20/skramble_/screenshots', '_blank', 3, 800, 600, 'Skramble on Moby Games', 0),
(57, 'http://myomnitrix.com/uk/', '_blank', 1, 1080, 900, '', 1),
(59, 'http://disneystore.co.uk/sharethemagic/', '_blank', 1, 1080, 900, '', 0),
(60, 'https://www.facebook.com/DisneyEpicMickeyUK/app_517343104958422', '_blank', 1, 1080, 900, '', 0),
(61, 'http://www.cartoonnetwork.co.uk/show/ben-10-omniverse/games/ben-10-alien-unlock', '_blank', 1, 1080, 900, '', 0),
(62, 'http://www.youtube.com/watch?v=Rc9nUwttO4E', '_blank', 3, 800, 600, 'Scramble play 1', 0),
(63, 'http://www.cartoonnetwork.co.uk/show/ben-10-omniverse/games/ben-10-alien-unlock-2', '_blank', 1, 1080, 900, '', 0),
(65, 'http://unlock2.myomnitrix.com/uk/', '_blank', 1, 1080, 900, '', 0),
(66, 'http://www.galaxys4andmonstersuniversity.com/', '_blank', 1, 1080, 900, '', 1),
(67, 'http://www.flashtalking.net/view/508379/', '_blank', 2, 800, 500, 'Flashtalking', 0),
(68, 'http://www.jollyhosting2.com/Disney/monsters_university/monster_match/uk/', '_blank', 2, 1000, 800, 'View archive', 1),
(69, 'https://www.youtube.com/watch?v=IJlozsi6Djg', '_blank', 3, 800, 600, 'Scramble play 2', 0),
(70, 'https://www.youtube.com/watch?v=seTZESC4-5Y', '_blank', 3, 800, 600, 'Jungle Drums long play', 0);

-- --------------------------------------------------------

--
-- Table structure for table `link_types`
--

CREATE TABLE `link_types` (
  `link_type_id` int(11) NOT NULL,
  `link_type` text NOT NULL,
  `link_type_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `link_types`
--

INSERT INTO `link_types` (`link_type_id`, `link_type`, `link_type_label`) VALUES
(1, 'LIVE', 'View live'),
(2, 'ARCHIVED', 'View'),
(3, 'RESOURCE', '');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `platforms`
--

CREATE TABLE `platforms` (
  `platform_id` int(11) NOT NULL,
  `platform_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `platforms`
--

INSERT INTO `platforms` (`platform_id`, `platform_name`) VALUES
(1, 'Desktop'),
(2, 'Tablet'),
(3, 'Smartphone');

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE `technologies` (
  `tech_id` int(11) NOT NULL,
  `tech_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`tech_id`, `tech_name`) VALUES
(1, 'HTML'),
(2, 'PHP'),
(3, 'Flash'),
(4, 'XML'),
(5, 'MySQL'),
(6, 'CSS'),
(7, 'Javascript'),
(8, 'AS3'),
(9, 'AS2'),
(10, 'AS1'),
(11, 'Director Lingo'),
(12, '6502 Assembly'),
(13, 'Facebook'),
(14, 'Unity'),
(15, 'iOS'),
(16, 'Android');

-- --------------------------------------------------------

--
-- Table structure for table `territories`
--

CREATE TABLE `territories` (
  `territory_id` int(11) NOT NULL,
  `territory_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `territories`
--

INSERT INTO `territories` (`territory_id`, `territory_name`) VALUES
(1, 'EMEA'),
(2, 'UK'),
(3, 'US'),
(4, 'FR'),
(5, 'DE'),
(6, 'RU'),
(7, 'IT'),
(8, 'PT'),
(9, 'ES'),
(10, 'DK'),
(11, 'ES'),
(12, 'NL'),
(13, 'BEFL'),
(14, 'BEFR'),
(15, 'UK, FR, DE, IT, PT, ES, DK');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Stephen Hamilton', 'stephenhamilton@mac.com', '$2y$10$QBe9P.e.JMtDtqGGeHdJU.XAKbQchJxOv7CIh2Iw67.Xvg0YbqopW', NULL, '2016-01-27 13:44:53', '2016-01-27 13:44:53');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `video_id` int(11) NOT NULL,
  `video_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_id`, `video_name`) VALUES
(1, 'anirogskramble.mov');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affiliations`
--
ALTER TABLE `affiliations`
  ADD PRIMARY KEY (`affiliation_id`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`award_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`entry_id`),
  ADD UNIQUE KEY `entry_key` (`entry_key`);

--
-- Indexes for table `entries_affiliations`
--
ALTER TABLE `entries_affiliations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `affiliation_id` (`affiliation_id`);

--
-- Indexes for table `entries_awards`
--
ALTER TABLE `entries_awards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `award_id` (`award_id`);

--
-- Indexes for table `entries_categories`
--
ALTER TABLE `entries_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `entries_clients`
--
ALTER TABLE `entries_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `entries_frameworks`
--
ALTER TABLE `entries_frameworks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `framework_id` (`framework_id`);

--
-- Indexes for table `entries_images`
--
ALTER TABLE `entries_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `image_id` (`image_id`);

--
-- Indexes for table `entries_links`
--
ALTER TABLE `entries_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `link_id` (`link_id`);

--
-- Indexes for table `entries_platforms`
--
ALTER TABLE `entries_platforms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `entries_technologies`
--
ALTER TABLE `entries_technologies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `tech_id` (`tech_id`);

--
-- Indexes for table `entries_territories`
--
ALTER TABLE `entries_territories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `territory_id` (`territory_id`);

--
-- Indexes for table `entries_videos`
--
ALTER TABLE `entries_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `frameworks`
--
ALTER TABLE `frameworks`
  ADD PRIMARY KEY (`framework_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `link_type` (`link_type`);

--
-- Indexes for table `link_types`
--
ALTER TABLE `link_types`
  ADD PRIMARY KEY (`link_type_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`platform_id`);

--
-- Indexes for table `technologies`
--
ALTER TABLE `technologies`
  ADD PRIMARY KEY (`tech_id`);

--
-- Indexes for table `territories`
--
ALTER TABLE `territories`
  ADD PRIMARY KEY (`territory_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `affiliations`
--
ALTER TABLE `affiliations`
  MODIFY `affiliation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `award_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `entries`
--
ALTER TABLE `entries`
  MODIFY `entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `entries_affiliations`
--
ALTER TABLE `entries_affiliations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `entries_awards`
--
ALTER TABLE `entries_awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `entries_categories`
--
ALTER TABLE `entries_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `entries_clients`
--
ALTER TABLE `entries_clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `entries_frameworks`
--
ALTER TABLE `entries_frameworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `entries_images`
--
ALTER TABLE `entries_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `entries_links`
--
ALTER TABLE `entries_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `entries_platforms`
--
ALTER TABLE `entries_platforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `entries_technologies`
--
ALTER TABLE `entries_technologies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT for table `entries_territories`
--
ALTER TABLE `entries_territories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `entries_videos`
--
ALTER TABLE `entries_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `frameworks`
--
ALTER TABLE `frameworks`
  MODIFY `framework_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `link_types`
--
ALTER TABLE `link_types`
  MODIFY `link_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `platforms`
--
ALTER TABLE `platforms`
  MODIFY `platform_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `technologies`
--
ALTER TABLE `technologies`
  MODIFY `tech_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `territories`
--
ALTER TABLE `territories`
  MODIFY `territory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entries_affiliations`
--
ALTER TABLE `entries_affiliations`
  ADD CONSTRAINT `entries_affiliations_ibfk_1` FOREIGN KEY (`affiliation_id`) REFERENCES `affiliations` (`affiliation_id`),
  ADD CONSTRAINT `entries_affiliations_ibfk_2` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`);

--
-- Constraints for table `entries_awards`
--
ALTER TABLE `entries_awards`
  ADD CONSTRAINT `entries_awards_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_awards_ibfk_2` FOREIGN KEY (`award_id`) REFERENCES `awards` (`award_id`);

--
-- Constraints for table `entries_categories`
--
ALTER TABLE `entries_categories`
  ADD CONSTRAINT `entries_categories_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `entries_clients`
--
ALTER TABLE `entries_clients`
  ADD CONSTRAINT `entries_clients_ibfk_2` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_clients_ibfk_3` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`);

--
-- Constraints for table `entries_frameworks`
--
ALTER TABLE `entries_frameworks`
  ADD CONSTRAINT `entries_frameworks_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_frameworks_ibfk_2` FOREIGN KEY (`framework_id`) REFERENCES `frameworks` (`framework_id`);

--
-- Constraints for table `entries_images`
--
ALTER TABLE `entries_images`
  ADD CONSTRAINT `entries_images_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_images_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`);

--
-- Constraints for table `entries_links`
--
ALTER TABLE `entries_links`
  ADD CONSTRAINT `entries_links_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_links_ibfk_2` FOREIGN KEY (`link_id`) REFERENCES `links` (`link_id`);

--
-- Constraints for table `entries_platforms`
--
ALTER TABLE `entries_platforms`
  ADD CONSTRAINT `entries_platforms_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_platforms_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`platform_id`);

--
-- Constraints for table `entries_technologies`
--
ALTER TABLE `entries_technologies`
  ADD CONSTRAINT `entries_technologies_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_technologies_ibfk_2` FOREIGN KEY (`tech_id`) REFERENCES `technologies` (`tech_id`);

--
-- Constraints for table `entries_territories`
--
ALTER TABLE `entries_territories`
  ADD CONSTRAINT `entries_territories_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_territories_ibfk_2` FOREIGN KEY (`territory_id`) REFERENCES `territories` (`territory_id`);

--
-- Constraints for table `entries_videos`
--
ALTER TABLE `entries_videos`
  ADD CONSTRAINT `entries_videos_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`entry_id`),
  ADD CONSTRAINT `entries_videos_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`);

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`link_type`) REFERENCES `link_types` (`link_type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
