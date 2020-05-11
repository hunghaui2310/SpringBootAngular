-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for doan
CREATE DATABASE IF NOT EXISTS `doan` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `doan`;

-- Dumping structure for table doan.blog
CREATE TABLE IF NOT EXISTS `blog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `num_see` int DEFAULT NULL,
  `detail_content` varchar(10000) DEFAULT NULL,
  `img_banner` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.blog: ~3 rows (approximately)
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` (`id`, `title`, `create_date`, `img`, `num_see`, `detail_content`, `img_banner`) VALUES
	(1, 'Lựa chọn nội thất gia đình hài hòa theo phong thủy', '01/01/2020', '1.jpg', 704, '{\n  "detail":[\n    {\n      "header": "Đồ nội thất nhà ở rất đa dạng tùy theo nhu cầu sử dụng. Tuy nhiên, những vật dụng cơ bản như bàn ghế tiếp khách, bàn ăn, giường, tủ… nếu được lựa chọn hợp lý sẽ đem đến sự thoải mái và tạo khí năng hòa hợp trong gia đình.",\n      "content": "Thông thường, những đồ vật có hình dáng mềm mại, uốn lượn sẽ mang nhiều tính âm và những đồ vật có góc cạnh, đường thẳng thì mang tính dương nhiều hơn. Nhưng hình tròn là một ngoại lệ, tuy là vòng tròn nhưng lại mang tính dương nhiều hơn là âm.Ví dụ, phòng bếp thuộc hành Hỏa không nên sử dụng bàn ăn góc cạnh hay hình móng ngựa. Hoặc những đồ dùng trong nhà như thảm, rèm, khăn trải bàn là những vật trang trí thể hiện sự mềm mại, góp phần tạo ra không gian mang tính âm. Các vật dụng mang tính âm rất phù hợp trong phòng ngủ, nơi thư giãn bởi chúng tạo nên sự yên tĩnh và thoải mái.",\n      "footer": "Chất liệu của đồ nội thất gia đình rất đa dạng, có thể là gỗ, tre mây, đá hoa, thép, inox…. Những vật dụng có bề mặt nhẵn, cứng và bóng thường mang tính dương nhiều hơn vì chúng làm khí năng lưu thông nhanh. Ngược lại, những đồ vật có bề mặt mềm mại, không phát quang là vật mang tính âm bởi chúng làm giảm bớt sự lưu thông khí năng trong nhà. Cụ thể, sàn nhà bằng đá hoa cương mang tính dương vì nó nhẵn, cứng và bóng. Gỗ cũng được coi là phương tiện vận chuyển khí năng lưu thông nhanh trong nhà nếu được đánh bóng loáng. Trong khi đó, đồ bằng mây, tre thuộc sản phẩm tự nhiên, chúng mang tính âm và làm giảm tốc độ lưu truyền của khí. Những vật dụng trang trí như gốm, sứ, đất sét có thể mang tính âm hay dương tùy theo bề mặt của chúng có phản chiếu ánh sáng hay không. Màu xanh, xanh da trời và màu nhạt mang tính âm nhiều, phù hợp cho những không gian mang tính chất nghỉ ngơi, thư giãn. Ngược lại, tông màu hồng, vàng tươi, da cam… mang tính dương nhiều hơn, thích hợp với những không gian vui nhộn, kích thích sự sáng tạo, hưng phấn."\n    }\n    ]\n}', 'banner1.jpg'),
	(2, 'Mẫu kệ ti vi hiện đại cho phòng khách', '02/01/2020', '2.jpg', 1433, '{\r\n  "detail":[\r\n    {\r\n      "header": "Trong mỗi ngôi nhà, phòng khách không thể thiếu kệ tivi. Kệ tivi vừa là vật dụng nội thất với chức năng lưu trữ những thiết bị nghe nhìn, vừa có chức năng là một vật dụng trang trí cho không gian nội thất phòng khách. Ngày nay, những không gian phòng khách hiện đại với thiết kế đơn giản, sang trọng và tinh tế, nên những chiếc kệ tivi cũng được thiết kế đơn giản hơn, tập trung vào tổng thể sang trọng và hiện đại cho không gian.",\r\n      "content": "Màu xanh, xanh da trời và màu nhạt mang tính âm nhiều, phù hợp cho những không gian mang tính chất nghỉ ngơi, thư giãn. Ngược lại, tông màu hồng, vàng tươi, da cam… mang tính dương nhiều hơn, thích hợp với những không gian vui nhộn, kích thích sự sáng tạo, hưng phấn.",\r\n      "footer": "Kệ tivi cho phòng khách hiện đại thường được thiết kế với 2 khối riêng biệt, hoặc cũng có thể làm liền với vách phía sau. Phần dưới thường được dưới đất, phần này chính là phần lưu trử những thiết bị nghe nhìn của gia đình bạn. Phần kệ treo tường với một hệ thống kệ (hoặc cánh tủ) chạy dài, với công năng chủ yếu là trang trí và lưu trữ những vật dụng trang trí khác. Kệ tivi mang đến không gian phòng khách nhà bạn một vẻ đẹp hiện đại và sang trọng…"\r\n    }\r\n    ]\r\n}', 'banner2.jpg'),
	(3, 'Chọn màu sắc trang trí nhà theo ý nghĩa', '12/12/2019', '3.jpg', 1247, '{\r\n  "detail":[\r\n    {\r\n      "header": "Hiểu biết về ý nghĩa của màu sắc sẽ giúp bạn lựa chọn màu trang trí nhà phù hợp và đẹp mắt hơn. Nếu như trong kiến trúc cổ của người phương Đông, màu đỏ là màu chủ đạo, thì với người phương Tây, màu vàng mới là màu mang lại sự may mắn và hạnh phúc. Trong trang trí nhà, màu vàng chỉ nên được sử dụng như một màu nhấn. Ví dụ, bạn có thể có trải một tấm thảm hoặc dùng các loại phụ kiện màu vàng trong phòng khách. Sơn tường vàng thường không phải là một ý tưởng hay vì dễ gây chói mắt, nóng bức và chật hẹp.",\r\n      "content": "Màu đen tượng trưng cho sự mạnh mẽ, thanh lịch và đơn giản. Trong quan niệm hiện đại, màu sắc này là biểu tượng của giàu sang và quyền lực. Màu đen tuy hơi tối để sử dụng ở phòng ngủ hay các khu vực chung như phòng khách, phòng ăn nhưng lại là một lựa chọn thú vị cho phòng làm việc. Tuy nhiên, bạn nên sử dụng màu đen với liều lượng vừa đủ hay phối cùng những gam màu sáng khác để làm giảm sự nặng nề cho căn phòng. Ngoài ra, hãy chắc chắn căn phòng trang trí bằng gam màu đen luôn có đủ ánh sáng để không bị tối.",\r\n      "footer": "Màu trắng là biểu tượng của sự trong sáng, tinh khiết và giản dị. Không những vậy, đây còn là một màu sắc cực kỳ linh hoạt. Dù sử dụng ở không gian nào, màu trắng cũng dễ gây cho người sử dụng nhiều thiện cảm. Nếu muốn có không gian sống sáng sủa, sạch sẽ và đơn giản, màu trắng là lựa chọn tốt nhất của bạn, tuy nhiên nó sẽ không phát huy được hiệu quả trang trí nếu bạn hướng tới phong cách năng động và bắt mắt"\r\n    }\r\n    ]\r\n}', 'banner3.jpg');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;

-- Dumping structure for table doan.cart_product
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL DEFAULT '0',
  `cart_id` bigint NOT NULL DEFAULT '0',
  `num_pro` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.cart_product: ~18 rows (approximately)
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
INSERT INTO `cart_product` (`id`, `product_id`, `cart_id`, `num_pro`) VALUES
	(5, 9, 1, 3),
	(6, 10, 1, 4),
	(41, 18, 1, 1),
	(42, 11, 1, 1),
	(45, 19, 3, 1),
	(46, 7, 3, 3),
	(49, 11, 8, 1),
	(50, 7, 8, 1),
	(51, 7, 11, 2),
	(52, 8, 12, 3),
	(53, 9, 12, 1),
	(54, 8, 13, 1),
	(55, 9, 13, 1),
	(56, 7, 13, 2),
	(73, 12, 2, 3),
	(77, 7, 17, 1),
	(78, 8, 17, 2);
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;

-- Dumping structure for table doan.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.category: 4 rows
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `create_date`, `category_name`) VALUES
	(1, '2019-12-20 18:08:02', 'Bàn ghế phòng khách'),
	(2, '2019-12-20 18:08:29', 'Bàn ghế phòng ăn'),
	(3, '2019-12-20 18:09:00', 'Tủ quần áo'),
	(4, '2019-12-20 18:09:08', 'Kệ ti vi');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table doan.comment
CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `blog_id` bigint DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.comment: ~7 rows (approximately)
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`id`, `user_id`, `product_id`, `blog_id`, `content`, `status`, `create_date`) VALUES
	(1, 7, 7, NULL, 'sản phẩm đáng mua', 1, '2020-02-01 23:58:07'),
	(2, 7, NULL, 1, 'bài viết hay, ý nghĩa', 0, '2020-02-01 23:58:43'),
	(7, 8, 7, NULL, 'tét cập nhật 3', 1, '2020-02-15 20:48:36'),
	(9, 8, NULL, 1, 'test them moi', 1, '2020-02-16 14:10:00'),
	(10, 8, NULL, 3, 'de lai binh luan', 1, '2020-02-16 14:31:00'),
	(11, 8, NULL, 3, 'test cap nhat', 1, '2020-02-16 14:32:16'),
	(12, 8, 7, NULL, 'test phan trang danh gia', 1, '2020-02-16 22:23:36');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- Dumping structure for table doan.compare_pro
CREATE TABLE IF NOT EXISTS `compare_pro` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL DEFAULT '0',
  `user_id` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.compare_pro: ~10 rows (approximately)
/*!40000 ALTER TABLE `compare_pro` DISABLE KEYS */;
INSERT INTO `compare_pro` (`id`, `product_id`, `user_id`) VALUES
	(10, 7, 1),
	(21, 9, 7),
	(22, 11, 7),
	(23, 7, 1),
	(27, 7, 18),
	(28, 8, 18),
	(32, 10, 8),
	(33, 11, 8),
	(34, 11, 19),
	(35, 12, 19);
/*!40000 ALTER TABLE `compare_pro` ENABLE KEYS */;

-- Dumping structure for table doan.employee
CREATE TABLE IF NOT EXISTS `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `manage_code` varchar(50) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code` (`code`),
  KEY `FK_employee_employee` (`manage_code`),
  CONSTRAINT `FK_employee_employee` FOREIGN KEY (`manage_code`) REFERENCES `employee` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.employee: ~3 rows (approximately)
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`id`, `code`, `email`, `password`, `first_name`, `last_name`, `phone_number`, `address`, `birthday`, `gender`, `manage_code`, `salary`, `create_date`, `last_login`) VALUES
	(1, 'admin', 'hungadmin@gmail.com', '$2a$10$NkfTt7fMuTdAXNUKs9twJe42afLK23RD5gzj0HboGbOfLk7WTAU6u', 'Hùng', 'Nguyễn', '0367854435', NULL, NULL, 'nam', NULL, NULL, '2020-02-21 14:32:09', '2020-03-29 15:04:39'),
	(4, 'NV-3', 'quanglam123@gmail.com', '$2a$10$.jk.3s269p6zoMZfR8SYoeEGCCoXEll8TkovdA1qo4MzBSsyKEHYe', 'Lâm', 'Quang', '0857483839', NULL, NULL, 'nam', 'admin', 9000000, '2020-02-23 19:00:32', '2020-03-02 16:21:19'),
	(5, 'NV-4', 'hoanganh@gmail.com', '$2a$10$xrvDXdASVm5zQ/gBpmbAHe.0MpjksNVCBdYd8GAgJbzSi8YoyjEDS', 'Anh', 'Hoàng', '0785435464', NULL, NULL, 'nam', 'NV-3', 8000000, '2020-02-23 19:09:55', '2020-03-28 21:40:59');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- Dumping structure for table doan.employee_role
CREATE TABLE IF NOT EXISTS `employee_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `employee_code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_employee_role_role` (`role_name`),
  KEY `FK_employee_role_employee` (`employee_code`),
  CONSTRAINT `FK_employee_role_employee` FOREIGN KEY (`employee_code`) REFERENCES `employee` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.employee_role: ~4 rows (approximately)
/*!40000 ALTER TABLE `employee_role` DISABLE KEYS */;
INSERT INTO `employee_role` (`id`, `role_name`, `employee_code`) VALUES
	(1, 'ROLE_ADMIN', 'admin'),
	(3, 'ROLE_USER', 'NV-3'),
	(4, 'ROLE_USER', 'NV-4');
/*!40000 ALTER TABLE `employee_role` ENABLE KEYS */;

-- Dumping structure for table doan.file_info
CREATE TABLE IF NOT EXISTS `file_info` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT NULL,
  `file_type_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`file_id`),
  KEY `FILE_INFO_FK` (`product_id`),
  KEY `file_type_id` (`file_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.file_info: ~112 rows (approximately)
/*!40000 ALTER TABLE `file_info` DISABLE KEYS */;
INSERT INTO `file_info` (`file_id`, `url`, `file_type_id`, `product_id`, `category_id`) VALUES
	(1, 'ba1.jpg', 1, 7, 2),
	(2, 'ba2.jpg', 1, 8, 2),
	(3, 'ba3.jpg', 1, 9, 2),
	(4, 'ba4.jpg', 1, 10, 2),
	(5, 'g1.jpg', 1, 11, 1),
	(6, 'g2.jpg', 1, 12, 1),
	(7, 'g3.jpg', 1, 13, 1),
	(8, 'g4.jpg', 1, 14, 1),
	(10, 'tv1.jpg', 1, 16, 4),
	(11, 'tv2.jpg', 1, 17, 4),
	(12, 'tv3.jpg', 1, 18, 4),
	(13, 'qa1.jpg', 1, 19, 3),
	(14, 'qa2.jpg', 1, 21, 3),
	(15, 'qa3.jpg', 1, 22, 3),
	(16, 'qa4.jpg', 1, 23, 3),
	(17, 'qa5.jpg', 1, 24, 3),
	(18, 'g5.jpg', 1, 25, 1),
	(19, 'g6.jpg', 1, 26, 1),
	(20, 'g7.jpg', 1, 27, 1),
	(21, 'g8.jpg', 1, 28, 1),
	(22, 'ba5.jpg', 1, 29, 2),
	(23, 'ba6.jpg', 1, 30, 2),
	(24, 'g9.jpg', 1, 40, 1),
	(25, 'g10.jpg', 1, 41, 1),
	(26, 'g11.jpg', 1, 42, 1),
	(27, 'tv4.jpg', 1, 43, 4),
	(28, 'tv5.jpg', 1, 133, 4),
	(29, 'g1.jpg', 2, 11, 1),
	(30, 'g2.jpg', 2, 12, 1),
	(31, 'g3.jpg', 2, 13, 1),
	(32, 'g4.jpg', 2, 14, 1),
	(33, 'g5.jpg', 2, 25, 1),
	(34, 'g6.jpg', 2, 26, 1),
	(35, 'g7.jpg', 2, 27, 1),
	(36, 'g8.jpg', 2, 28, 1),
	(37, 'g9.jpg', 2, 40, 1),
	(38, 'g10.jpg', 2, 41, 1),
	(39, 'g11.jpg', 2, 42, 1),
	(40, 'g12.jpg', 2, 33, 1),
	(41, 'g13.jpg', 2, 35, 1),
	(42, 'g14.jpg', 2, 38, 1),
	(43, 'g15.jpg', 2, 45, 1),
	(44, 'g16.jpg', 2, 48, 1),
	(45, 'ba6.jpg', 2, 30, 2),
	(46, 'ba7.jpg', 2, 34, 2),
	(47, 'ba8.jpg', 2, 39, 2),
	(48, 'ba9.jpg', 2, 44, 2),
	(49, 'ba10.jpg', 2, 49, 2),
	(50, 'ba1.jpg', 2, 7, 2),
	(51, 'ba2.jpg', 2, 8, 2),
	(52, 'ba3.jpg', 2, 9, 2),
	(53, 'ba4.jpg', 2, 10, 2),
	(54, 'ba5.jpg', 2, 29, 2),
	(55, 'qa6.jpg', 1, 20, 3),
	(56, 'tv6.jpg', 1, 31, 4),
	(57, 'tv7.jpg', 1, 51, 4),
	(58, 'g12.jpg', 1, 33, 1),
	(59, 'ba7.jpg', 1, 34, 2),
	(60, 'g13.jpg', 1, 35, 1),
	(61, 'qa7.jpg', 1, 36, 3),
	(62, 'tv8.jpg', 1, 37, 4),
	(63, 'g14.jpg', 1, 38, 1),
	(64, 'ba8.jpg', 1, 39, 2),
	(65, 'ba9.jpg', 1, 44, 2),
	(66, 'g15.jpg', 1, 45, 1),
	(67, 'qa8.jpg', 1, 46, 3),
	(68, 'tv9.jpg', 1, 47, 4),
	(69, 'g16.jpg', 1, 48, 1),
	(70, 'ba10.jpg', 1, 49, 2),
	(71, 'qa9.jpg', 1, 50, 3),
	(72, 'ba1-2.jpg', 2, 7, 2),
	(73, 'ba1-3.jpg', 2, 7, 2),
	(74, 'ba2-1.jpg', 2, 8, 2),
	(76, 'ba2-2.jpg', 2, 8, 2),
	(77, 'ba2-3.jpg', 2, 8, 2),
	(78, 'ba3-1.jpg', 2, 9, 2),
	(79, 'ba3-2.jpg', 2, 9, 2),
	(80, 'ba3-3.jpg', 2, 9, 2),
	(81, 'ba4-1.jpg', 2, 10, 2),
	(82, 'ba4-2.jpg', 2, 10, 2),
	(83, 'ba4-3.jpg', 2, 10, 2),
	(84, 'g1-1.jpg', 2, 11, 1),
	(85, 'g1-2.jpg', 2, 11, 1),
	(86, 'g1-3.jpg', 2, 11, 1),
	(87, 'g2-1.jpg', 2, 12, 1),
	(88, 'g2-2.jpg', 2, 12, 1),
	(89, 'g2-3.jpg', 2, 12, 1),
	(90, 'g3-1.jpg', 2, 13, 1),
	(91, 'g3-2.jpg', 2, 13, 1),
	(92, 'g3-3.jpg', 2, 13, 1),
	(93, 'g4-1.jpg', 2, 14, 1),
	(94, 'g4-2.jpg', 2, 14, 1),
	(95, 'g4-3.jpg', 2, 14, 1),
	(96, 'tv1-1.jpg', 2, 16, 4),
	(97, 'tv1-2.jpg', 2, 16, 4),
	(98, 'tv1-3.jpg', 2, 16, 4),
	(99, 'tv2-1.jpg', 2, 17, 4),
	(100, 'tv2-2.jpg', 2, 17, 4),
	(101, 'tv2-3.jpg', 2, 17, 4),
	(102, 'tv3-1.jpg', 2, 18, 4),
	(103, 'tv3-2.jpg', 2, 18, 4),
	(104, 'tv3-3.jpg', 2, 18, 4),
	(105, 'qa1-1.jpg', 2, 19, 3),
	(106, 'qa1-2.jpg', 2, 19, 3),
	(107, 'qa1-3.jpg', 2, 19, 3),
	(108, 'qa2-1.jpg', 2, 21, 3),
	(109, 'qa2-2.jpg', 2, 21, 3),
	(110, 'qa2-3.jpg', 2, 21, 3),
	(111, 'qa3-1.jpg', 2, 22, 3),
	(112, 'qa3-2.jpg', 2, 22, 3),
	(113, 'qa3-3.jpg', 2, 22, 3),
	(114, 'ba1-1.jpg', 2, 7, 2);
/*!40000 ALTER TABLE `file_info` ENABLE KEYS */;

-- Dumping structure for table doan.file_type
CREATE TABLE IF NOT EXISTS `file_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `file_id` bigint DEFAULT NULL,
  `type_name` varchar(255) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.file_type: ~3 rows (approximately)
/*!40000 ALTER TABLE `file_type` DISABLE KEYS */;
INSERT INTO `file_type` (`id`, `file_id`, `type_name`, `size`) VALUES
	(1, 1, 'large-size', '300*300'),
	(2, 2, 'ảnh trong giỏ hàng', '120*166'),
	(3, 3, 'ảnh bé của từng sản phẩm', NULL);
/*!40000 ALTER TABLE `file_type` ENABLE KEYS */;

-- Dumping structure for table doan.hibernate_sequence
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.hibernate_sequence: 2 rows
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` (`next_val`) VALUES
	(146),
	(146);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;

-- Dumping structure for table doan.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL DEFAULT '0',
  `order_code` varchar(100) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `note` varchar(10000) DEFAULT NULL,
  `name_order` varchar(256) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `payment` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.order: ~21 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`id`, `user_id`, `order_code`, `create_date`, `note`, `name_order`, `address`, `phone_number`, `email`, `payment`) VALUES
	(12, 7, 'HD-1916410945', '2020-01-21 15:50:44', NULL, NULL, NULL, NULL, NULL, 1),
	(13, 7, 'HD-1708940487', '2020-01-21 16:22:53', NULL, NULL, NULL, NULL, NULL, 0),
	(14, 7, 'HD-1524185705', '2020-01-21 16:27:22', NULL, NULL, NULL, NULL, NULL, NULL),
	(15, 7, 'HD-1555253036', '2020-01-21 16:34:43', 'hhfjhasjkhas', NULL, NULL, NULL, NULL, NULL),
	(16, 7, 'HD-2134507587', '2020-01-21 16:54:12', NULL, NULL, NULL, NULL, NULL, NULL),
	(17, 1, 'HD-1904200013', '2020-01-29 22:12:51', NULL, NULL, NULL, NULL, NULL, NULL),
	(18, 1, 'HD-943639047', '2020-01-29 22:13:28', NULL, NULL, NULL, NULL, NULL, NULL),
	(19, 1, 'HD-817965462', '2020-01-30 22:16:00', NULL, NULL, NULL, NULL, NULL, NULL),
	(20, 1, 'HD-1019536818', '2020-01-30 22:22:51', NULL, NULL, NULL, NULL, NULL, NULL),
	(21, 1, 'HD-965952118', '2020-01-30 22:31:13', NULL, NULL, NULL, NULL, NULL, NULL),
	(22, 1, 'HD-585937776', '2020-01-30 22:34:13', NULL, NULL, NULL, NULL, NULL, NULL),
	(23, 1, 'HD-1425401223', '2020-01-30 22:35:10', NULL, NULL, NULL, NULL, NULL, NULL),
	(24, 1, 'HD-1291321331', '2020-01-30 22:38:48', NULL, NULL, NULL, NULL, NULL, NULL),
	(25, 1, 'HD-413855244', '2020-01-30 22:39:19', NULL, NULL, NULL, NULL, NULL, NULL),
	(26, 1, 'HD-330318551', '2020-01-30 22:39:39', NULL, NULL, NULL, NULL, NULL, NULL),
	(27, 1, 'HD-1143362656', '2020-01-30 22:43:13', NULL, NULL, NULL, NULL, NULL, NULL),
	(28, 19, 'HD-478796951', '2020-02-14 13:42:39', NULL, NULL, NULL, NULL, NULL, NULL),
	(29, 19, 'HD-373699260', '2020-02-14 14:41:47', NULL, NULL, NULL, NULL, NULL, NULL),
	(30, 19, 'HD-108627745', '2020-02-14 14:44:46', NULL, NULL, NULL, NULL, NULL, NULL),
	(31, 8, 'HD-402545394', '2020-02-19 21:13:41', NULL, NULL, NULL, NULL, NULL, NULL),
	(32, 8, 'HD-1044918759', '2020-03-03 16:56:08', NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table doan.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `des` varchar(2000) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `num_like` bigint DEFAULT NULL,
  `price` int DEFAULT NULL,
  `product_name` varchar(1000) DEFAULT NULL,
  `is_new` int DEFAULT NULL,
  `num_buy` int DEFAULT NULL,
  `code_discount` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_1` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.product: 118 rows
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`product_id`, `category_id`, `create_date`, `des`, `discount`, `num_like`, `price`, `product_name`, `is_new`, `num_buy`, `code_discount`) VALUES
	(7, 2, '2017-09-20 00:00:00', 'Bộ bàn ăn bằng gỗ xoan đào hiện nay là một trong những bộ bàn ăn bán chạy nhất trong những mẫu bàn ăn. Với 8 ghế và 1 bàn trụ, bộ bàn ăn 01 sẽ giúp cho gia đình bạn sẽ có những bữa ăn ấm cúng.', 10, 10003, 10, 'Bàn ăn 01', 0, 300, '10-sp01'),
	(8, 2, '2020-02-03 21:59:15', 'Bàn ăn nhiều ghế', 0, 100002, 8, 'Bàn ăn 02', 0, 200, NULL),
	(9, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 10, 702, 7, 'Bàn ăn 03', 1, 55, '15-sp03'),
	(10, 2, '2018-07-12 00:00:00', 'san pham rat chat luong', 15, 21, 12, 'Bàn ăn 04', 0, 400, '17-sp04'),
	(11, 1, '2019-01-12 00:00:00', 'san pham rat chat luong', 0, 2002, 13, 'Bàn ghế phòng khách 01', 1, 414, '5-sp05'),
	(12, 1, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 403, 10, 'Bàn ghế phòng khách 02', 1, 31, '7-sp06'),
	(13, 1, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 112, 14, 'Bàn ghế phòng khách 03', 1, 22, '9-sp07'),
	(14, 1, '2019-06-12 00:00:00', 'san pham chat luong2', 30, 1000, 22, 'Bàn ghế phòng khách 04', 1, 44, '10-sp08'),
	(16, 4, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 25, 'Kệ ti vi 01', 1, 55, '20-sp09'),
	(17, 4, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 50, 'Kệ ti vi 02', 1, 67, '15-sp10'),
	(18, 4, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 24, 'Kệ ti vi 03', 1, 1786, '30-sp11'),
	(19, 3, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 701, 8, 'Tủ quần áo 01', 1, 12, '16-sp12'),
	(20, 3, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 5, 'Tủ quần áo 02', 1, 125, '13-sp13'),
	(21, 3, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 7, 'Tủ quần áo 03', 1, 76, NULL),
	(22, 3, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 100, 'Tủ quần áo 04', 1, 854, NULL),
	(23, 3, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 80, 'Tủ quần áo 05', 1, 135, NULL),
	(24, 3, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 40, 'Tủ quần áo 06', 1, 143, NULL),
	(25, 1, '2019-07-12 00:00:00', 'san pham chat luong3', 15, 300, 20, 'Bàn ghế phòng khách 05', 1, 15, NULL),
	(26, 1, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 30, 'Bàn ghế phòng khách 06', 1, 173, NULL),
	(27, 1, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 15, 'Bàn ghế phòng khách 07', 1, 643, NULL),
	(28, 1, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 17, 'Bàn ghế phòng khách 08', 1, 645, NULL),
	(29, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 14, 'Bàn ăn 05', 1, 423, NULL),
	(30, 2, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 13, 'Bàn ăn 06', 1, 124, NULL),
	(31, 4, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 7, 'Kệ ti vi 04', 1, 87, NULL),
	(33, 1, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 8, 'Bàn ghế phòng khách 09', 1, 178, NULL),
	(34, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 9, 'Bàn ăn 07', 1, 532, NULL),
	(35, 1, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 15, 'Bàn ghế phòng khách 10', 1, 1553, NULL),
	(36, 3, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 18, 'Tủ quần áo 07', 1, 963, NULL),
	(37, 4, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 24, 'Kệ ti vi 05', 1, 432, NULL),
	(38, 1, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 36, 'Bàn ghế phòng khách 11', 1, 86, NULL),
	(39, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 34, 'Bàn ăn 08', 1, 56, NULL),
	(40, 1, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 23, 'Bàn ghế phòng khách 12', 1, 25, NULL),
	(41, 1, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 22, 'Bàn ghế phòng khách 13', 1, 553, NULL),
	(42, 1, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 40, 'Bàn ghế phòng khách 14', 1, 875, NULL),
	(43, 4, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 100, 'Kệ ti vi 06', 1, 43, NULL),
	(44, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 70, 'Bàn ăn 09', 1, 26, NULL),
	(45, 1, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 30, 'Bàn ghế phòng khách 15', 1, 63, NULL),
	(46, 3, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 20, 'Tủ quần áo 08', 1, 843, NULL),
	(47, 4, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 22, 'Kệ ti vi 07', 1, 22, NULL),
	(48, 1, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 21, 'Bàn ghế phòng khách 16', 1, 713, NULL),
	(49, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 14, 'Bàn ăn 10', 1, 53, NULL),
	(50, 3, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 16, 'Tủ quần áo 09', 1, 873, NULL),
	(51, 4, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 17, 'Kệ ti vi 08', 1, 64, NULL),
	(52, 2, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 19, 'Bàn ăn 11', 1, 183, NULL),
	(53, 1, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 21, 'Bàn ghế phòng khách 17', 1, 273, NULL),
	(54, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 23, 'Bàn ăn 12', 1, 542, NULL),
	(55, 1, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 20, 'Bàn ghế phòng khách 18', 1, 654, NULL),
	(56, 3, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 22, 'Quan 44', 1, 254, NULL),
	(57, 4, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 20, 'Ao 12', 1, 115, NULL),
	(58, 1, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 30, 'Bàn ghế phòng khách 19', 1, 54, NULL),
	(59, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 31, 'Bàn ăn 13', 1, 94, NULL),
	(60, 3, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 34, 'Giay 17', 1, 574, NULL),
	(61, 4, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 13, 'Giay 28', 1, 654, NULL),
	(62, 2, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 7, 'Bàn ăn 14', 1, 787, NULL),
	(63, 1, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 6, 'Bàn ghế phòng khách 20', 1, 541, NULL),
	(64, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 8, 'Bàn ăn 15', 1, 63, NULL),
	(65, 1, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 9, 'Bàn ghế phòng khách 21', 1, 14, NULL),
	(66, 3, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 9, 'Quan 44', 1, 87, NULL),
	(67, 4, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 12, 'Ao 12', 1, 454, NULL),
	(68, 1, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 11, 'Bàn ghế phòng khách 22', 1, 212, NULL),
	(69, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 100, 'Ao 36', 1, 748, NULL),
	(70, 3, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 50, 'Giay 17', 1, 87, NULL),
	(71, 4, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 14, 'Giay 28', 1, 451, NULL),
	(72, 2, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 24, 'Giay 39', 1, 67, NULL),
	(73, 1, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 14, 'Bàn ghế phòng khách 23', 1, 544, NULL),
	(74, 1, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 20, 'Bàn ghế phòng khách 24', 1, 211, NULL),
	(75, 1, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 30, 'Bàn ghế phòng khách 25', 1, 774, NULL),
	(76, 1, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 9, 'Bàn ghế phòng khách 26', 1, 987, NULL),
	(77, 1, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 90, 'Bàn ghế phòng khách 27', 1, 97, NULL),
	(78, 1, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 40, 'Bàn ghế phòng khách 28', 1, 974, NULL),
	(79, 1, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 23, 'Bàn ghế phòng khách 29', 1, 6341, NULL),
	(80, 1, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 17, 'Bàn ghế phòng khách 30', 1, 874, NULL),
	(81, 1, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 18, 'Bàn ghế phòng khách 31', 1, 641, NULL),
	(82, 1, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 19, 'Bàn ghế phòng khách 32', 1, 74, NULL),
	(83, 2, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 20, 'Ban ghe phong khach 1', 1, 654, NULL),
	(84, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 30, 'Ban ghe phong khach 1', 1, 231, NULL),
	(85, 2, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 19, 'Ban ghe phong khach 2', 1, 561, NULL),
	(86, 2, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 17, 'Ban ghe phong khach 3', 1, 87, NULL),
	(87, 2, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 50, 'Ban ghe phong khach 4', 1, 541, NULL),
	(88, 2, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 15, 'Ban ghe phong khach 5', 1, 778, NULL),
	(89, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 100, 'Ban ghe phong khach 6', 1, 54, NULL),
	(90, 2, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 20, 'Ban ghe phong khach 7', 1, 67, NULL),
	(91, 2, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 17, 'Ban ghe phong khach 8', 1, 787, NULL),
	(92, 2, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 100, 'Ban ghe phong khach 9', 1, 64, NULL),
	(93, 2, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 10, 'Ban ghe phong an 1', 1, 877, NULL),
	(94, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 12, 'Ban ghe phong an 2', 1, 78, NULL),
	(95, 2, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 35, 'Ban ghe phong an 3', 1, 441, NULL),
	(96, 2, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 14, 'Ban ghe phong an 4', 1, 74, NULL),
	(97, 2, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 50, 'Ban ghe phong an 5', 1, 784, NULL),
	(98, 2, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 17, 'Ban ghe phong an 6', 1, 64, NULL),
	(99, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 31, 'Ban ghe phong an 7', 1, 24, NULL),
	(100, 2, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 32, 'Ban ghe phong an 8', 1, 34, NULL),
	(101, 2, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 33, 'Ban ghe phong an 9', 1, 78, NULL),
	(103, 2, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 12, 'tu 1', 1, 45, NULL),
	(104, 2, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 14, 'tu 2', 1, 774, NULL),
	(105, 2, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 9, 'tu 3', 1, 242, NULL),
	(106, 2, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 40, 'tu 4', 1, 111, NULL),
	(107, 2, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 15, 'tu 5', 1, 78, NULL),
	(108, 2, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 16, 'tu 6', 1, 45, NULL),
	(109, 2, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 16, 'tu 7', 1, 96, NULL),
	(110, 2, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 16, 'tu 8', 1, 42, NULL),
	(111, 2, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 15, 'tu 9', 1, 52, NULL),
	(112, 2, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 14, 'tu 10', 1, 63, NULL),
	(113, 3, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 7, 'tu 1', 1, 18, NULL),
	(114, 3, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 8, 'tu 2', 1, 78, NULL),
	(115, 3, '2019-07-12 00:00:00', 'san pham chat luong3', 20, 300, 12, 'tu 3', 1, 452, NULL),
	(116, 3, '2018-09-12 00:00:00', 'san pham chat luong4', 20, 500, 14, 'tu 4', 1, 123, NULL),
	(117, 3, '2017-09-12 00:00:00', 'san pham chat luong5', 20, 600, 15, 'tu 5', 1, 124, NULL),
	(118, 3, '2019-09-20 00:00:00', 'san pham chat luong6', 20, 320, 10, 'tu 6', 1, 47, NULL),
	(119, 3, '2019-01-12 00:00:00', 'san pham chat luong7', 20, 700, 8, 'tu 7', 1, 45, NULL),
	(120, 3, '2018-07-12 00:00:00', 'san pham rat chat luong', 20, 20, 9, 'tu 8', 1, 88, NULL),
	(121, 3, '2019-01-12 00:00:00', 'san pham rat chat luong', 20, 2000, 14, 'tu 9', 1, 100, NULL),
	(122, 3, '2019-11-12 00:00:00', 'san pham rat chat luong', 20, 400, 15, 'tu 10', 1, 78, NULL),
	(123, 4, '2019-09-12 00:00:00', 'san pham chat luong1', 20, 111, 11, 'ke ti vi 1', 1, 414, NULL),
	(124, 4, '2019-06-12 00:00:00', 'san pham chat luong2', 20, 1000, 12, 'ke ti vi 2', 1, 474, NULL),
	(15, 1, '2020-02-25 14:59:25', 'Bàn ăn chất lượng', 0, NULL, 20, 'Bàn ăn 20', 1, 0, NULL),
	(32, 1, '2020-02-25 15:05:36', 'Bàn ăn chất lượng', 0, NULL, 20, 'Bàn ăn 20', 1, 0, NULL),
	(102, 2, '2020-02-25 15:54:07', 'Hùng NN Test chức năng thêm mới', 13, NULL, 20, 'Test thêm mới', 1, 0, '12-vbcxv');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table doan.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.user: 12 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `full_name`, `password`, `role`, `username`, `address`, `phone_number`) VALUES
	(1, 'admin', '$2a$10$NkfTt7fMuTdAXNUKs9twJe42afLK23RD5gzj0HboGbOfLk7WTAU6u', 'ADMIN', 'hung23101998@gmail.com', NULL, NULL),
	(11, 'Van Lam', '$2a$10$U5g6OG0KloXpHYZBLlLHB.FEq78ghf1kRHo..T7jNYFgtaMS/nXJq', 'USER', 'vanlam123@gmail.com', NULL, NULL),
	(10, 'Lam Quang', '$2a$10$jXJH7qdoLV9sgTuqTkT3YuE.PMyjo1vYrhLQfMFYOJ.h1JOBOHB9C', 'USER', 'lamquang@gmail.com', NULL, NULL),
	(8, 'NguyenHung', '$2a$10$oB2iOhjEMddZiEn0Z84g1uO96tIedY4ypK4Fnp/xCIJf3..BpPD92', 'USER', 'hunghomhinh2310@gmail.com', '22 Đức Diễn Hà Nội', '0364516673'),
	(7, 'Khai Pham', '$2a$10$dQyv7NAp/fjhyb2zh.vluOsa7LwddC/XMogQ3Vh.66it2QegOB74i', 'USER', 'khai34232@gmail.com', NULL, NULL),
	(9, 'Thanh Cong', '$2a$10$tcIXcL9mev9CCOtXQHn2hOXEy7HVeckKvNP.dKXFCf4G.KUuBE6MG', 'USER', 'thanhcong@gmail.com', NULL, NULL),
	(12, 'Tung Do', '$2a$10$fgzz4O3SRw/M5dAXUVGDWuqaIpN9fplVODEUyDX24QtQ/AVJ75sMG', 'USER', 'tungdo@gmail.com', NULL, NULL),
	(18, 'Viet Hoang', '$2a$10$dM44WJ5RnZ0KjLApakmYpuHklVubKigQyE7v68uz6VNk8VMUYb9nC', 'USER', 'viethoang@gmail.com', NULL, NULL),
	(17, 'Cong Nguyen', '$2a$10$T74xaFrYqslKexL3te038.MRPY4N3665LRVt4BIBr0dJALO1IP7Ca', 'USER', 'congnguyen@gmail.com', NULL, NULL),
	(19, 'Nguyen Hang', '$2a$10$NuGvkcGSq72ZyHr5zTSFpuaLRKXSuCfXG9tQ4RuzBHbLcALg8gHlC', 'USER', 'nguyenhang123@gmail.com', NULL, NULL),
	(24, 'HungNN DZ', '$2a$10$yn.DtLzApzozvDCy41.HqOx8dTjYVFDaRCG4XIJoSdZB/I8GnkHyS', 'USER', 'hungnn.mangotech@gmail.com', NULL, NULL),
	(25, 'Hung Haui', '$2a$10$0Okl5Cm/LQwleD.ptB14Rur6r8pneL7OX2go.RzerHWx..InBuY4u', 'USER', 'hunghaui2310@gmail.com', NULL, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table doan.user_cart
CREATE TABLE IF NOT EXISTS `user_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `cart_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `cart_id` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.user_cart: ~18 rows (approximately)
/*!40000 ALTER TABLE `user_cart` DISABLE KEYS */;
INSERT INTO `user_cart` (`id`, `user_id`, `cart_id`) VALUES
	(1, 1, 1),
	(2, 7, 2),
	(3, 8, 3),
	(4, 9, 4),
	(5, 10, 5),
	(6, 11, 6),
	(7, 12, 7),
	(8, 15, 8),
	(9, 16, 9),
	(10, 17, 10),
	(11, 18, 11),
	(12, 19, 12),
	(13, 20, 13),
	(14, 21, 14),
	(15, 22, 15),
	(16, 23, 16),
	(17, 24, 17),
	(18, 25, 18);
/*!40000 ALTER TABLE `user_cart` ENABLE KEYS */;

-- Dumping structure for table doan.user_wishlist
CREATE TABLE IF NOT EXISTS `user_wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT '0',
  `wishlist_id` bigint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.user_wishlist: ~16 rows (approximately)
/*!40000 ALTER TABLE `user_wishlist` DISABLE KEYS */;
INSERT INTO `user_wishlist` (`id`, `user_id`, `wishlist_id`) VALUES
	(1, 1, 1),
	(2, 7, 7),
	(3, 8, 8),
	(4, 9, 9),
	(5, 10, 10),
	(6, 11, 11),
	(7, 12, 12),
	(8, 17, 17),
	(9, 18, 18),
	(10, 19, 19),
	(11, 20, 20),
	(12, 21, 21),
	(13, 22, 22),
	(14, 23, 23),
	(15, 24, 24),
	(16, 25, 25);
/*!40000 ALTER TABLE `user_wishlist` ENABLE KEYS */;

-- Dumping structure for table doan.wishlist_product
CREATE TABLE IF NOT EXISTS `wishlist_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `wishlist_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table doan.wishlist_product: ~16 rows (approximately)
/*!40000 ALTER TABLE `wishlist_product` DISABLE KEYS */;
INSERT INTO `wishlist_product` (`id`, `wishlist_id`, `product_id`) VALUES
	(1, 7, 7),
	(2, 7, 8),
	(3, 1, 22),
	(4, 1, 23),
	(11, 8, 12),
	(12, 8, 19),
	(16, 18, 12),
	(20, 8, 10),
	(22, 19, 7),
	(23, 19, 12),
	(24, 8, 7),
	(25, 8, 9),
	(26, 20, 7),
	(27, 20, 9),
	(28, 20, 11);
/*!40000 ALTER TABLE `wishlist_product` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
