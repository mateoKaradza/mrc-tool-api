CREATE DATABASE  IF NOT EXISTS `moonrise_crystals_database` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `moonrise_crystals_database`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: moonrise_crystals_database
-- ------------------------------------------------------
-- Server version	5.7.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customer_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `country` varchar(45) DEFAULT 'USA',
  `notes` text,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `Username_UNIQUE` (`username`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1320 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1309,'Mateo','karadza','mateo.karadza','mateo.karadza@gmail.com','0996877249','dsadad','dsdadad','sadsada','dsadsadas','Croatia','Maecenas sit amet luctus enim. Nulla vel metus sed metus ultrices commodo. Integer vitae massa a libero pulvinar elementum dignissim in mi. Curabitur sed iaculis neque. Nulla nec porttitor turpis. Donec erat urna, mollis ac elementum a, vulputate et mi. Praesent nibh urna, viverra vitae dapibus ac, sodales sed eros. Phasellus ut felis neque. Phasellus eleifend sodales scelerisque. Cras tellus libero, sodales at magna eu, viverra ullamcorper odio. Sed cursus turpis a nibh pulvinar, ac auctor sapien pellentesque. Sed vestibulum mauris et tellus tempus, in efficitur purus aliquet. Aenean pulvinar mi non leo hendrerit, ut pellentesque nisi finibus. Vivamus sagittis dui non faucibus porta. Aliquam pulvinar sollicitudin mi, quis efficitur nunc dignissim vitae.',0),(1318,'first name of the existing user','last name','username1','email1','phone','','','','','','',0);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `order_id` smallint(6) NOT NULL,
  `product_id` smallint(6) NOT NULL,
  `quantity` smallint(6) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `first_stone_earning` decimal(10,4) DEFAULT '0.0000',
  `second_stone_earning` decimal(10,4) DEFAULT '0.0000',
  `third_stone_earning` decimal(10,4) DEFAULT '0.0000',
  `order_details_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `feedback_message` text,
  `inventory_cost` decimal(10,4) DEFAULT '0.0000',
  PRIMARY KEY (`order_details_id`),
  KEY `idx FK Product_ID` (`product_id`),
  KEY `idx FK Order_ID` (`order_id`),
  CONSTRAINT `fk_Orders_has_Products_Orders1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orders_has_Products_Products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2405 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1063,210,5,20.00,33.0000,44.0000,55.0000,2402,'',67.0000),(1063,203,11,33.00,1.0000,2.0000,3.0000,2403,NULL,5.5500);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `customer_id` smallint(6) NOT NULL,
  `platform_id` varchar(10) NOT NULL,
  `date` date DEFAULT NULL,
  `additional_cost` decimal(10,2) DEFAULT '0.00',
  `notes` text,
  `repeat_customer` varchar(10) DEFAULT NULL,
  `status` smallint(6) DEFAULT '0',
  PRIMARY KEY (`order_id`),
  KEY `idx Customer_ID` (`customer_id`),
  KEY `idx Platform_ID` (`platform_id`),
  CONSTRAINT `fk_Orders_Customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orders_Platforms1` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`platform_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1066 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1063,1318,'1','2016-08-06',10.00,'gadgagag',NULL,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `platforms` (
  `platform_id` varchar(10) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES ('1','Website'),('2','Ebay'),('3','Etsy');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_vendor`
--

DROP TABLE IF EXISTS `product_vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_vendor` (
  `unique_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `date_added` date NOT NULL,
  `product_id` smallint(6) NOT NULL,
  `vendor_id` smallint(6) NOT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `quality` varchar(45) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`unique_id`,`date_added`,`product_id`,`vendor_id`),
  KEY `fk_product_vendor_products1_idx` (`product_id`),
  KEY `fk_product_vendor_vendors1_idx` (`vendor_id`),
  CONSTRAINT `fk_product_vendor_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_vendor_vendors1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_vendor`
--

LOCK TABLES `product_vendor` WRITE;
/*!40000 ALTER TABLE `product_vendor` DISABLE KEYS */;
INSERT INTO `product_vendor` VALUES (7,'2016-08-02',203,3,'',10.00,'20','',''),(8,'2016-08-01',203,4,'10',15.00,'20','quality','');
/*!40000 ALTER TABLE `product_vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `product_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `default_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` smallint(6) DEFAULT '0',
  `quantity` smallint(6) DEFAULT '0',
  `first_stone_earning` decimal(10,4) DEFAULT '0.0000',
  `second_stone_earning` decimal(10,4) DEFAULT '0.0000',
  `third_stone_earning` decimal(10,4) DEFAULT '0.0000',
  `inventory_cost` decimal(10,4) DEFAULT '0.0000',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (203,'New Product',24.00,0,2,1.0000,10.0000,3.0000,5.5500),(210,'Product 1234',11.00,0,60,33.0000,44.0000,55.0000,66.0000),(211,'Testing Product',0.00,0,0,0.0000,0.0000,0.0000,0.0000);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(70) NOT NULL,
  `email` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('mateo','baze1234',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors` (
  `vendor_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `contact_person` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `notes` text,
  PRIMARY KEY (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (3,'Uber Vendor','Da Person','','','wwweb','email','',0,'some notes about the vendor'),(4,'Vendor 3','','','','','','',0,'');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-03 12:20:22
