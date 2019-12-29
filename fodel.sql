-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 29, 2019 at 09:16 AM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.3.13-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fodel`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` text,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'makanan'),
(2, 'minuman'),
(3, 'pedas'),
(4, 'manis'),
(5, 'kue'),
(6, 'aneka nasi'),
(7, 'bakso & soto'),
(8, 'cepat saji'),
(9, 'bakmie'),
(10, 'boba');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `description` text,
  `restaurant_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `description`, `restaurant_id`, `created_at`, `updated_at`) VALUES
(1, 'Natus iste.', '1928324.00', 'Consequatur temporibus quidem. Sed asperiores et aliquid tempore quaerat odio voluptatum vitae. Sapiente excepturi error consequatur in. Et autem architecto. Sed qui quis. Quod laborum ab dignissimos maxime beatae facilis.\n \rAliquam nobis dolor et harum. Molestias expedita quis dolores. Non corrupti aut sit deserunt. Voluptatibus quis ut. Qui architecto eaque id consequatur possimus.\n \rEst est ipsum tenetur. Et assumenda provident. Dolorum omnis enim sed maxime natus eveniet eos voluptas. Sapiente voluptas quibusdam corporis rerum dolor sed.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(2, 'Ex sed.', '665078.00', 'Quasi rem labore voluptas nobis reprehenderit quidem adipisci. Perferendis hic eum sunt aut sit harum molestiae qui eos. Optio aspernatur pariatur. Molestiae non culpa tempore laboriosam qui. Vel totam perspiciatis nostrum autem dignissimos. Voluptatem quis magnam debitis distinctio voluptas.\n \rError dolores iste explicabo et quam aperiam laboriosam accusantium. Deleniti deleniti quidem dolorum nemo sit hic numquam. Eius ipsa consequatur cum et ea harum et perspiciatis. Odit quis sapiente repellat totam in quae esse inventore. Quo earum minus repudiandae inventore mollitia corrupti aut sapiente officia. Consequatur voluptas architecto officia.\n \rAlias sed exercitationem minus optio nostrum. Natus architecto cumque voluptatem iure. Ratione unde voluptatem dolores fugiat magnam.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(3, 'Ullam voluptas.', '1288579.00', 'Soluta consequatur est laudantium harum id suscipit mollitia. Ipsum et illum autem qui ut non expedita. Ad expedita voluptas et et.\n \rItaque eligendi itaque. Assumenda enim et. Id qui sunt consequatur eum et porro qui atque. Consequuntur ut omnis nulla perspiciatis necessitatibus. Omnis quae voluptas. In voluptates nihil dolores.\n \rAlias soluta sint ut. Repellendus recusandae possimus ipsum veritatis. Error officia earum ut maxime dolorum. Et nam minus doloribus consequuntur.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(4, 'Mollitia et.', '1003937.00', 'Animi odit consequatur ut numquam mollitia corporis. Qui impedit omnis. Aut et voluptatem ab. Sint id repellat consectetur qui.\n \rConsectetur minus nihil voluptatum optio pariatur sit et. Voluptas consectetur possimus. Autem ex expedita sit animi mollitia eveniet impedit voluptatem.\n \rPerspiciatis est nesciunt sed illum qui atque doloremque. Architecto optio quisquam ullam distinctio dolorem. Ut sed nostrum inventore sed accusantium commodi voluptatum error. Id aperiam quo beatae debitis. Doloremque dolorum debitis fuga enim itaque accusamus. Accusantium id fuga reprehenderit architecto laboriosam enim modi.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(5, 'Sunt maiores.', '929268.00', 'Voluptate repudiandae libero nemo earum delectus pariatur vitae et. Autem cum et sit repellat rerum libero saepe quam deleniti. Cum molestias ut qui laborum quis. Accusamus et dolorum aut rerum nulla consequatur. Quia similique sunt labore. Iusto quasi voluptatum fuga adipisci ab placeat sint sunt minus.\n \rNeque et autem nostrum consectetur veniam molestiae. Ut qui tempore omnis dolore voluptatem dolore aperiam. Rerum unde qui aliquam neque iusto velit libero velit. Facere nihil rerum dolor excepturi voluptas asperiores consectetur nihil eum. Voluptas reiciendis sunt aut. Blanditiis modi dolorem voluptatem quos et consequatur consectetur sint.\n \rNostrum laudantium sint et in ratione labore ut praesentium. Ducimus a impedit explicabo laboriosam est enim laborum perspiciatis quod. Sit corporis modi qui quibusdam.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(6, 'Et quia.', '1778987.00', 'Fugit a id qui. Optio velit ab dolore voluptatibus. Et molestiae cum.\n \rSimilique aut facere laboriosam soluta aperiam rerum ipsam debitis. Necessitatibus commodi laboriosam cumque praesentium quaerat. Pariatur porro dolor maiores sit tempore odit. Pariatur inventore rerum voluptas. Qui placeat unde. Minus et sed sunt eius.\n \rUllam nemo magnam id. Saepe nulla sed dolores fuga. Possimus eveniet explicabo a. Quo exercitationem et nobis. In voluptatem facere qui accusamus beatae corrupti commodi totam dignissimos. Et iste et.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(7, 'Quisquam natus.', '871061.00', 'Voluptatem omnis non aspernatur quam molestiae libero. Consectetur enim est et est similique. Nihil non quaerat laudantium eos rem.\n \rNon dolores odio numquam ut perspiciatis fugit quia. Fugit nihil sit est. Ipsum sequi velit amet sapiente ducimus a blanditiis voluptas. Quia itaque et dignissimos vel ratione aperiam et beatae aliquid. Maxime sunt qui voluptas est fugit.\n \rAutem beatae voluptatem et fuga. Sint neque suscipit. Iusto sit dolore voluptates autem ea. In est architecto sed nisi quia amet aut unde. Aut vitae possimus consectetur aut ab. Inventore maiores facilis qui possimus id molestiae a molestiae magnam.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(8, 'Rerum quidem.', '1165661.00', 'Ea consectetur quam aspernatur doloribus. Rerum alias officiis. Quisquam alias illum maxime eum quam illum dolorum dolore qui. Consequatur aut libero explicabo recusandae iusto voluptatem deleniti.\n \rAutem sunt id quia culpa ullam itaque. Iusto omnis ullam et. Blanditiis aut est architecto quod et quo molestiae tempore sed. Sed hic quidem fuga quis.\n \rTotam fugit explicabo magni. Quo voluptatem hic pariatur. Et deleniti et sed est.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(9, 'Vitae in.', '184095.00', 'Dolores est et minus dignissimos ea aliquid omnis. Dolorem quia fugiat quo. Eos quaerat iusto eos quia animi ipsa velit voluptatem distinctio.\n \rSint ut aliquid eos cumque qui. Sit molestiae ea architecto veritatis nihil ullam veniam atque. Excepturi suscipit ratione aut numquam cupiditate aspernatur. Nam est blanditiis ad est nisi excepturi.\n \rDolorem perspiciatis sit quis dolor. Qui est cupiditate. Qui consequatur nostrum et voluptas illo error ad.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(10, 'Sit enim.', '682958.00', 'Nulla facilis omnis eaque aut beatae. Temporibus nemo itaque omnis quos est hic ad aliquid qui. Voluptatibus ipsa eum rerum praesentium quia. Explicabo id perspiciatis iusto qui aperiam ullam quisquam ea quas. Qui explicabo est sit molestias.\n \rEa amet vero rerum ut quo eos facilis reiciendis. Ad reprehenderit quisquam. Et hic aut reiciendis magnam inventore quo voluptatibus.\n \rVeritatis vero quia ducimus recusandae eligendi facilis veritatis. Debitis repudiandae libero qui ut alias consequatur. Aliquid cupiditate eum aut.', 1, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(11, 'Animi et.', '1396578.00', 'Ut maiores id itaque cum nesciunt. Et recusandae repellendus est cumque molestias error consectetur voluptas sint. Nihil fugiat reprehenderit.\n \rEsse in et in pariatur. Velit quidem qui non suscipit ipsam minus distinctio. Itaque ipsum quo qui aut consequatur voluptatibus repudiandae ut dolorum.\n \rRerum voluptatum id voluptas eos sapiente. Voluptatem beatae nulla sed adipisci. Velit animi provident fuga eligendi qui placeat cum.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(12, 'Quia non.', '1611760.00', 'Est optio commodi quasi culpa est. Animi sit odio odio ullam. Officiis ducimus consequuntur odit fuga corrupti. Et nihil commodi repellendus eum quia. Dolores voluptate aut voluptas nostrum id. Mollitia nostrum doloribus sint molestiae in voluptas.\n \rOdit voluptas consequuntur explicabo doloremque iure. Ut et molestiae similique cumque et fugiat. Sed voluptates blanditiis dignissimos voluptatibus. Vel minus dolorum.\n \rExcepturi est fugit molestiae ea voluptas debitis a. Enim impedit recusandae nulla est sit. Sint voluptatem quia explicabo sunt quia et incidunt quo. Sed ut consequatur quasi officiis et rem voluptatem cupiditate. Magnam earum dolorem sed facere ullam. Voluptatem sed quia sed eveniet.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(13, 'A neque.', '1762347.00', 'Ipsa fugiat et ex quod corporis praesentium aspernatur. Ipsam hic atque quo eaque aut nam voluptatem sunt non. Velit magnam praesentium. Eos aut aut sint sit et tenetur soluta optio iste. Voluptatem accusamus consectetur ut sunt delectus quibusdam quam. Odio sed corporis.\n \rVoluptas optio ab quam et quia aut ipsam ratione omnis. Accusantium voluptatibus est eum recusandae nemo. Non deleniti quia. Illum itaque omnis totam aspernatur id error. Rerum et odio rerum accusantium. Consequatur quas ipsam est.\n \rRerum iste quia quae ut tempora illum voluptatem doloremque. Dicta fugiat expedita. Impedit perspiciatis ab et aut quam nihil iste.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(14, 'Voluptatem quia.', '1690321.00', 'Qui et saepe fugit in nesciunt. Aut necessitatibus voluptates beatae ea officiis quam. Sed adipisci nihil et. Voluptatibus recusandae dolore officiis. Dignissimos voluptatem ut rerum et aut cumque libero magni rerum. Earum facere non dolor aperiam eum.\n \rVoluptatem quo fugit delectus omnis est ad voluptatem minima doloribus. Dignissimos fugiat omnis doloribus. Laudantium omnis non repellat.\n \rAd doloremque aut earum aut. Consequatur veritatis quia. Totam aperiam ipsa est id et quasi. Commodi ut porro quisquam enim eligendi quas aliquid.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(15, 'Et labore.', '800926.00', 'Sapiente nobis sapiente error rerum provident dolorum molestias et. Quam rerum ad ab est necessitatibus est. Nostrum dignissimos natus nostrum quis minus officia cumque alias. Est cumque repudiandae ratione ad. Facere distinctio vero nobis est magni praesentium ut. Illo sit ipsum possimus libero.\n \rOptio officia quia culpa est quisquam consectetur quia. Corporis corrupti quos nihil nam fugit. Eligendi unde tenetur qui enim aut. Id blanditiis error voluptate. Cum nulla facilis veniam excepturi.\n \rEveniet maiores voluptas qui enim ut rerum sed est. Provident omnis consectetur omnis corporis deserunt laudantium. Cum cumque atque officia necessitatibus tenetur blanditiis.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(16, 'Dolores nostrum.', '822980.00', 'Ad deleniti soluta aut. Ad aspernatur nam. Sit eos exercitationem qui ipsum velit odio placeat illo.\n \rImpedit doloremque numquam et quisquam accusantium nostrum expedita sit ipsam. Exercitationem facere sint qui. Quis placeat ut ipsa magni. Quos omnis dolore cumque deleniti doloremque nihil aut. Omnis impedit ut modi laudantium incidunt eos. Ratione inventore qui numquam commodi sit.\n \rFuga sed aut. Repellendus nemo placeat suscipit est quo culpa facere provident fuga. Labore quasi quasi qui. Ut ipsa modi.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(17, 'Doloribus ut.', '867395.00', 'Minus autem eos ea quae aliquam. Unde eum nam praesentium numquam commodi accusamus numquam officia. Laboriosam aspernatur omnis placeat ab vero qui. In et officia commodi amet voluptates ex illo. Illum doloribus aut quae. Harum quisquam maiores aliquid nihil.\n \rHic ratione numquam. Ducimus eos aut vero est ab. Sed et nobis rem. Odit quibusdam aut autem atque quas. Eum earum animi aspernatur et dolor.\n \rQui tempore alias nulla. Facilis blanditiis consequatur temporibus officiis architecto est quos modi. Et accusantium praesentium et. Et ipsa pariatur et ullam.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(18, 'Iure modi.', '692168.00', 'Ullam voluptatem doloribus est ipsam. Similique accusantium aut facere consequatur suscipit officiis labore error. Harum quidem velit. Rerum praesentium maiores qui. Tenetur quisquam nam qui aliquid officiis neque asperiores. Error atque voluptate.\n \rDelectus rerum illum quo non consequatur. Incidunt eius accusamus blanditiis in est tenetur. Maiores est quo dolores et deserunt nam repellat sit.\n \rEt possimus repellat quia facere suscipit numquam. Atque natus nostrum. Laudantium harum possimus.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(19, 'Est ea.', '1019341.00', 'Consequatur id vero doloremque aut error qui accusantium. Est incidunt ut magni quas exercitationem. Iste consequatur enim vero accusamus quaerat quod fugiat sed. Occaecati expedita quis numquam. Perferendis ut odit maiores pariatur minus. Ea sit tenetur.\n \rSint voluptatum in reiciendis odio. Dolore nihil molestiae omnis nobis quia ducimus aut id unde. In dolorem in veniam quis fuga et voluptas.\n \rSimilique sunt aut dicta omnis aut. Laudantium distinctio laborum quidem laudantium dolore sit quo eum repellendus. Omnis ratione et voluptas ut est vel.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(20, 'Debitis harum.', '1731614.00', 'Ut voluptas veniam et error sed ut quia aut sunt. Minus ipsum sequi autem amet consectetur vel quisquam. Et architecto delectus vero est accusamus enim dolores odit. Mollitia veritatis provident. Omnis voluptas pariatur rerum ipsam saepe.\n \rQuo qui quod eum autem corporis quis tempore. At delectus commodi aut eaque sed dolorem illum nemo. Et quam voluptatum. Ut suscipit quam. Nobis natus ipsa architecto distinctio dolorem unde.\n \rExcepturi ad quo hic doloremque velit. Aut natus fugit nostrum quam quam. Hic facilis fugiat maiores ut. Non dolor est et rerum velit dolorem et repudiandae.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(21, 'Quo earum.', '1239609.00', 'Inventore repellat adipisci excepturi pariatur repellat molestias ut excepturi. Voluptatem dolor sint eos error similique. Quam voluptas nihil magnam sed ducimus et. Quasi blanditiis ut illo illum eum iusto laborum laboriosam. Consectetur molestiae magni asperiores. Quia voluptatem fugit nesciunt consequuntur vitae culpa eius officiis asperiores.\n \rUt sit eveniet aperiam ad non temporibus deserunt. Autem et harum velit. Tempore non tenetur in. Sequi voluptatem iusto architecto at tempora aut sed laboriosam unde. Quam modi veniam dicta veniam ad nihil non. Explicabo veniam eum id eos suscipit aut unde saepe.\n \rAutem adipisci nemo aut quam non voluptas magnam. Perspiciatis incidunt dolores aut. Corporis quidem laboriosam ut quibusdam qui quibusdam. Odit aut aut quos quis quo et praesentium nemo. Nesciunt sit possimus provident tempora sunt libero nesciunt. Ratione eos sed et neque ut aspernatur et sapiente numquam.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(22, 'Quia omnis.', '1829600.00', 'Iure repellendus facilis et debitis sunt quibusdam qui voluptatem. Provident reiciendis facilis enim nihil. Error fugit sint nostrum reiciendis. Repellendus ut a tempore dolorem velit explicabo.\n \rFugiat quam officia saepe eveniet tempora. Qui quidem corrupti consequatur aliquid tempora non aspernatur. Qui vitae ea molestias quo quia cumque dolorum facere.\n \rTempore quibusdam architecto fuga eos esse ex architecto dolorem magnam. Quibusdam eos excepturi facilis dolorem velit. Vel ut optio et rerum. Fugit ut culpa expedita ab officiis nihil quidem.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(23, 'In quaerat.', '555681.00', 'Sapiente ipsam quia repellendus minima sapiente aut. Rem ipsam blanditiis id. Magnam fugit dolorem sit deserunt quis occaecati quo tempore eum. Assumenda quas qui.\n \rDebitis labore possimus facere. Unde quas quis voluptas inventore sint ex. Et rem omnis velit et iusto. Blanditiis ut soluta nihil.\n \rMagni aut expedita praesentium. Est quas ratione ut quasi ut. Ea incidunt accusamus ut est amet aliquam rerum doloremque. Minus veniam molestiae est unde reprehenderit asperiores possimus.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(24, 'Qui sit.', '492354.00', 'Necessitatibus aut doloremque harum. Expedita debitis quia et ut similique nesciunt. Tempora rerum libero aliquam ut dolores. Aut ipsa sit ipsa similique velit vel quae aliquam fugit. Sit sapiente facere perspiciatis illum dolorem. Cum ad voluptates quis voluptas accusantium.\n \rAnimi aliquid ab. Deleniti quia quia non. Ex pariatur illum tenetur culpa aut aut doloremque. Temporibus quidem reiciendis quia possimus et blanditiis consequuntur est.\n \rRepellendus consectetur vitae aut corrupti tempora architecto praesentium ut. Fugiat voluptatem eaque laborum. Vero similique quo fuga debitis vel perspiciatis officia sit. Est temporibus sit.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(25, 'Qui autem.', '578903.00', 'Debitis consequatur atque itaque suscipit aliquam consequuntur dolore occaecati. Voluptatem doloremque numquam iure et quisquam praesentium possimus placeat dolorem. Sed in odit officiis ut voluptate cupiditate. Deserunt voluptatem dolorem sed error sequi. Iure consequatur atque est autem eligendi.\n \rQui ut quos reiciendis molestiae. Quo omnis sequi minima voluptates eos impedit porro. Sit rerum est.\n \rEt non accusamus aut sit quae harum quis earum eos. Sit vel provident molestiae distinctio aliquid. Inventore ut eum qui tempora nam quibusdam aut quis. Nobis ea dicta. Quod quia corrupti eum quis qui ad odio. Et maxime placeat et placeat rerum.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(26, 'Voluptatum porro.', '1955258.00', 'Aut et dolore accusamus. Laudantium reprehenderit maiores dicta possimus voluptas sed esse delectus. Cupiditate ut odio suscipit praesentium. Incidunt accusamus est sed magnam adipisci error quidem.\n \rFuga laborum laboriosam. Harum libero eos necessitatibus eveniet similique atque aliquid consequatur. Recusandae qui voluptate eveniet voluptatibus blanditiis in quidem veniam perferendis. Iusto explicabo similique molestiae laboriosam. Voluptas ipsum ullam. Distinctio ea dolorum ipsam.\n \rAssumenda iusto expedita eaque recusandae. Ad ab facere. Ducimus ipsum nihil autem.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(27, 'Animi optio.', '391938.00', 'Modi et cumque eligendi officiis quisquam exercitationem et cumque. Optio est quidem est eveniet reprehenderit et. Sapiente dolorem reiciendis soluta ut necessitatibus dolorum modi. Quas sed minus eos ea.\n \rEaque ut ipsum qui. Qui aut quia consequatur omnis sapiente. Quasi earum explicabo iure amet vero minima ut. Totam velit dolore voluptatum beatae. Ab dolores quia provident suscipit distinctio aliquid dolorum.\n \rMolestiae enim itaque et rem soluta est odio. Doloremque ratione eum illo quia. Consequatur eos perspiciatis est sed optio dignissimos dolorem.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(28, 'Unde quasi.', '1599111.00', 'Minus atque ratione rerum est autem natus vero et. Id dolorem dolorem soluta. Et minima ut quia assumenda quis consequatur ab maiores officiis. Esse est quam itaque nulla quia nostrum. Distinctio est quo. Reiciendis reiciendis qui.\n \rUnde dolorum consectetur sit vero voluptatem quo. Vel quos facere quis eius dicta quisquam quidem. Reiciendis ipsa non iste sit fuga expedita voluptatem eos quisquam. Esse doloremque eos ut. Officia enim quam qui a eum et. Omnis id esse.\n \rDebitis at dolores ipsa quo nesciunt cumque. Et qui iste laborum. Quisquam alias facilis eius eligendi cum sint quisquam. Fuga repudiandae porro nisi incidunt repudiandae dignissimos quas. Molestias delectus ut expedita iure distinctio quasi quia. Eos et repellat.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(29, 'Voluptatem assumenda.', '382202.00', 'Alias doloremque quo aut sunt id ipsum aut. Ratione ut beatae explicabo fugiat eligendi. Deleniti et incidunt inventore. Sequi molestias ab neque tenetur omnis repellat aliquam quia.\n \rAd tempora omnis et molestiae autem placeat officia sed eum. Architecto nobis explicabo molestiae. Voluptatum consequuntur odio enim et in facilis ipsum eius. Quasi nemo et sed voluptatem nihil perspiciatis eaque id. Dolores in ipsam iure recusandae dolorum voluptatem ipsum voluptatem ut.\n \rOdit repudiandae sint. Quis voluptates eos in et exercitationem velit. Omnis iure porro ullam.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(30, 'Nisi consectetur.', '796388.00', 'Nemo occaecati velit tempora cumque quis commodi porro aut laudantium. Aut quisquam enim est odit. Possimus rerum doloremque quia harum. Ut et rerum. Eum quia et at dolor corporis. Iure esse laborum aut inventore aliquid.\n \rNam nemo mollitia qui est soluta. Delectus reprehenderit saepe veniam. Dignissimos voluptatibus quia et.\n \rVoluptatibus harum molestiae. Non dolorem rerum dolores esse dolor. Aperiam dolorem est voluptatibus eum soluta quas odit quae asperiores. Delectus porro blanditiis totam ipsum mollitia qui autem qui. Voluptate amet consequuntur consequuntur quia molestiae in numquam. Fugit adipisci error sunt dolores et molestiae et.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(31, 'Voluptatem est.', '283960.00', 'Repellat deserunt quo eaque totam odio tempore vitae molestiae illo. Aliquid et error sint quia dicta. Eum expedita dolor repellat quas dicta non eum illo amet. Rerum distinctio voluptas tempora nulla qui esse voluptatem delectus. Est veniam vel illo ab ipsum aspernatur libero eveniet.\n \rUt reiciendis ut quisquam mollitia facilis qui non dolorum repellendus. Modi consectetur repellendus et dicta qui sed vel qui. Velit ut provident minima reprehenderit et excepturi et omnis sapiente. Dolor qui eos praesentium quasi officia.\n \rA sapiente dolores. Corporis temporibus neque. Provident occaecati enim omnis sunt quos. Et voluptas labore quo ex itaque modi animi sed. Voluptatem enim ut necessitatibus minima eos vitae impedit dolor.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(32, 'Consequatur esse.', '788799.00', 'Repellat aut quaerat repellat. Est accusamus rem dolor corporis cum et. Exercitationem consectetur autem autem hic ratione.\n \rAliquid et optio. Molestiae a repudiandae vel omnis dolor minima. Officia omnis est rerum similique repellat.\n \rSit nihil officia sapiente qui ipsum dicta dignissimos nesciunt. Repellendus dolore nihil. Consequatur error est pariatur magni eligendi harum consequatur fuga. Temporibus quia sint neque porro quaerat. Qui asperiores corrupti veniam.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(33, 'Laborum laboriosam.', '451454.00', 'Dolores inventore minus omnis quia qui ut quod voluptas. Quae qui tenetur molestiae reiciendis aut vitae deserunt. Omnis consequatur repellendus quidem odit vitae aperiam. Enim voluptatem ab et. Quis quisquam non adipisci ut et suscipit occaecati.\n \rAliquid id tempore ipsum qui autem. Tempore quo sequi et aspernatur in laborum doloribus. Laboriosam et id sapiente. Dolorum debitis in amet. Molestiae aspernatur mollitia vero et sit modi.\n \rRepudiandae ullam sit porro omnis tempora aperiam numquam similique. Iste incidunt sed molestiae doloribus necessitatibus non saepe non. Quis qui illum ut suscipit consequatur qui. Non adipisci error consequatur voluptatum fugit quidem. Ex consectetur est consequatur ab aut rerum.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(34, 'Quisquam pariatur.', '1320873.00', 'Sit eligendi quo sunt. Sunt quisquam nobis repellendus vel tempora. Voluptas quaerat iste consequatur qui. Fugiat praesentium velit. Deserunt dolores vero eum voluptas in aut cum et tenetur. Nobis qui non et laboriosam omnis ab doloribus.\n \rVel qui sunt commodi rerum aperiam officia. Aliquam autem occaecati qui nesciunt dolores quia porro laboriosam magnam. Quo eligendi quidem doloribus et. Maiores ratione impedit et et non repudiandae nobis. Et aut et sequi quo vitae consequatur odio earum vel. Voluptatibus repellendus placeat molestiae sed.\n \rSoluta numquam labore consequuntur reiciendis laborum provident. Repellendus accusantium tempore quis commodi laboriosam qui. Quidem fugiat adipisci iure dolorum. Fugit officia deleniti. Libero dolores adipisci et deleniti sit magni labore.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(35, 'Nisi corrupti.', '629021.00', 'Dolor quas ratione repellat numquam qui vitae eaque. Sed repellat amet quam ex velit voluptatum culpa et. Debitis reiciendis dolores unde et perferendis cumque. Quia natus tenetur vero consequuntur modi omnis alias neque. Facere voluptates beatae.\n \rSed quibusdam officia necessitatibus similique modi. Tempore sed et exercitationem vero blanditiis fuga natus. Sint iure accusantium quas omnis est nihil. Voluptas rerum quaerat voluptatibus eum id et velit. Quasi nihil vel voluptatem quasi est fugiat repellendus. Quod perspiciatis mollitia sapiente est.\n \rOccaecati voluptatem aliquam et eos ipsa voluptas debitis et in. Rerum omnis impedit sit alias nulla reiciendis quo. Sint voluptatem ut cupiditate. Et suscipit et modi eius non est nisi. Delectus nobis fugit a ut iste ex earum optio. Quaerat placeat ea.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(36, 'Qui ex.', '1576849.00', 'Earum qui beatae ut iusto molestiae. Possimus maxime odit quae ea. Dolores saepe est impedit. Magnam veritatis reiciendis et magni aut iste fugit quia.\n \rCulpa impedit doloribus et nostrum neque beatae illum quia enim. Voluptatem veritatis laudantium sequi. Hic eos aliquam vitae dolorem sed consequatur. Officiis quo exercitationem magni.\n \rIllum repellat quos accusantium ex placeat. Excepturi eligendi voluptas eum id eius autem provident ad. Soluta est ut iste similique. Nesciunt dicta eligendi molestiae quam. Architecto ipsum ea qui voluptas voluptatibus.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(37, 'Expedita consectetur.', '162067.00', 'Sit aut veritatis non ipsa et optio exercitationem dolores. Et est occaecati ut autem qui neque maxime. Numquam autem autem architecto.\n \rAut aspernatur aut molestiae nisi vitae quod ut accusantium quia. Nam suscipit quia explicabo similique consequatur. Molestiae esse cum. Similique quisquam totam adipisci repellat. Ut quae voluptatem voluptatum cumque.\n \rExpedita odio ut dolores recusandae cumque. Voluptatibus ex eveniet est vitae sint ut. Voluptate officiis error quia minima earum dolore. Fuga odit veritatis neque reiciendis et.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(38, 'Qui adipisci.', '1033242.00', 'Eos ex consequuntur ut aperiam porro. Quo ut nihil unde officiis voluptas. Quia ab quod odit. Fuga voluptatem ad totam. Consequatur veniam blanditiis qui pariatur et rerum. Nesciunt porro deserunt voluptatibus ut quidem minus aut.\n \rVoluptas placeat quod sed. Neque autem enim aut quam esse aut. Corrupti error magni consequatur rerum possimus. Aperiam iure neque consequuntur dolores repellat est nam reiciendis hic. Esse praesentium distinctio.\n \rAut sunt accusamus possimus magni est recusandae architecto. Ipsa perspiciatis et cupiditate rerum sit dolorum. Quis quae quasi laboriosam saepe ut dolore.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(39, 'Eligendi quaerat.', '380042.00', 'Sunt ea accusamus. Inventore reiciendis beatae illo. Ut error dolores omnis necessitatibus est necessitatibus tempore rerum vel.\n \rMolestias dolor mollitia aut veritatis et est. Tempore soluta molestias cumque et. Mollitia ducimus eum non ducimus eum sed sapiente. Qui numquam eaque. Et dolorem non est similique dolorum voluptatem. Voluptatibus impedit et magni laudantium sequi consequatur.\n \rAt quam dicta sunt similique. Temporibus tempore voluptatibus et doloribus quisquam qui ipsa perspiciatis autem. Earum esse nobis.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(40, 'Similique odio.', '638115.00', 'Blanditiis enim voluptatum modi ratione qui in debitis id. Quis maiores non omnis. Consectetur omnis est placeat et distinctio ut est eveniet. Sint ut quia odio vero est. Assumenda autem occaecati dolorem eveniet harum architecto. Sit assumenda porro.\n \rNecessitatibus eligendi sapiente ab laboriosam perspiciatis est est. Illo autem voluptatibus qui et et. Quia corporis occaecati vel molestiae odit doloremque. Voluptatem numquam ut itaque officia.\n \rEt sunt aliquid. Omnis eos consequatur reiciendis aut dolorem aut perspiciatis. Quam fugit et iste assumenda asperiores eum totam iusto. Excepturi eaque aut sed qui ut ut.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18');

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE `item_category` (
  `item_id` int(10) UNSIGNED DEFAULT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`item_id`, `category_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(2, 1),
(3, 1),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(5, 1),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 7),
(7, 8),
(7, 9),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(9, 1),
(10, 1),
(10, 2),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(11, 9),
(12, 1),
(12, 2),
(12, 3),
(12, 4),
(12, 5),
(12, 6),
(12, 8),
(12, 7),
(13, 1),
(13, 2),
(13, 3),
(13, 4),
(13, 5),
(13, 6),
(13, 7),
(13, 8),
(13, 9),
(14, 1),
(14, 2),
(14, 3),
(15, 1),
(15, 2),
(15, 3),
(16, 1),
(16, 2),
(16, 3),
(16, 4),
(17, 1),
(17, 2),
(17, 3),
(18, 1),
(18, 2),
(19, 1),
(19, 2),
(19, 3),
(19, 4),
(19, 5),
(19, 6),
(19, 7),
(19, 8),
(20, 1),
(20, 2),
(20, 3),
(20, 4),
(20, 5),
(20, 6),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(21, 5),
(21, 6),
(21, 7),
(22, 1),
(22, 2),
(22, 3),
(22, 4),
(22, 5),
(23, 1),
(23, 2),
(23, 3),
(23, 4),
(24, 1),
(24, 2),
(24, 3),
(24, 4),
(24, 5),
(24, 9),
(24, 6),
(24, 8),
(24, 7),
(25, 1),
(25, 2),
(25, 3),
(25, 4),
(25, 5),
(25, 6),
(25, 7),
(25, 8),
(26, 1),
(26, 2),
(26, 3),
(26, 4),
(26, 5),
(26, 6),
(27, 1),
(27, 2),
(27, 3),
(28, 1),
(28, 2),
(28, 3),
(28, 4),
(28, 5),
(29, 1),
(29, 2),
(29, 3),
(29, 4),
(29, 5),
(29, 6),
(29, 7),
(30, 1),
(30, 2),
(30, 3),
(30, 4),
(30, 5),
(30, 6),
(31, 1),
(31, 2),
(31, 4),
(31, 3),
(32, 1),
(32, 2),
(32, 3),
(32, 4),
(33, 1),
(33, 2),
(33, 3),
(33, 4),
(33, 5),
(33, 6),
(33, 7),
(33, 8),
(34, 1),
(34, 2),
(34, 3),
(34, 4),
(34, 5),
(34, 6),
(34, 7),
(35, 1),
(35, 2),
(35, 3),
(35, 4),
(35, 5),
(35, 6),
(36, 1),
(36, 2),
(36, 3),
(36, 4),
(36, 5),
(36, 6),
(36, 7),
(36, 8),
(36, 9),
(37, 1),
(38, 1),
(39, 1),
(39, 2),
(39, 3),
(39, 4),
(39, 5),
(39, 6),
(39, 7),
(40, 1),
(40, 2),
(40, 3),
(40, 4),
(40, 5),
(40, 6);

-- --------------------------------------------------------

--
-- Table structure for table `item_images`
--

CREATE TABLE `item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20191225214455_revoked_token.js', 1, '2019-12-28 17:11:22'),
(2, '20191225214826_roles.js', 1, '2019-12-28 17:11:22'),
(3, '20191225221714_users.js', 1, '2019-12-28 17:11:22'),
(4, '20191225224326_categories.js', 1, '2019-12-28 17:11:23'),
(5, '20191225224503_restaurants.js', 1, '2019-12-28 17:11:23'),
(6, '20191225224712_items.js', 1, '2019-12-28 17:11:23'),
(7, '20191225224944_item_category.js', 1, '2019-12-28 17:11:24'),
(8, '20191225225240_carts.js', 1, '2019-12-28 17:11:24'),
(9, '20191225225430_reviews.js', 1, '2019-12-28 17:11:24'),
(10, '20191227132046_images.js', 1, '2019-12-28 17:11:24');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `description` text,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `logo`, `longitude`, `latitude`, `description`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Nitzsche - Satterfield', 'http://lorempixel.com/640/480/business', '-125.0868', '12.7585', 'Quos officia quisquam molestiae ut minima sapiente aut. Asperiores laboriosam voluptatibus deserunt dignissimos molestiae corrupti. Velit quis repudiandae aliquid qui incidunt. Aut quasi eos et ea. Veritatis aut similique corrupti ut.\n \rError voluptas voluptas accusantium. Ut non quo rem maxime velit ut. Sapiente officiis impedit. Provident odio maxime ad minus libero explicabo. Omnis autem blanditiis omnis ut qui labore et totam eveniet. Omnis et ipsa labore iste assumenda et.\n \rVoluptas pariatur dolorem et. Esse assumenda hic aut numquam occaecati ut. Neque asperiores rem. Perferendis ullam qui molestias qui sequi sapiente quia esse.', 2, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(2, 'Carter - Kunde', 'http://lorempixel.com/640/480/business', '136.4125', '-42.7104', 'Labore nulla veritatis qui ut fuga ut accusantium autem aliquam. Aperiam et doloremque consectetur. Aut libero vel deserunt fugit rerum molestiae doloremque unde.\n \rConsequatur unde ipsum ea id ipsa rem aut. Culpa ea sint consectetur voluptatibus vitae at sunt numquam. Consectetur aliquid similique quo suscipit voluptatem blanditiis commodi debitis. At id voluptas. In officia omnis aut neque qui nam voluptate ipsum nostrum.\n \rNesciunt quasi eligendi iusto quia cum quia qui optio qui. Sed dignissimos vitae corrupti. Quos iure nam ex vel aliquid. Voluptatem rem dolor libero.', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(3, 'Farrell LLC', 'http://lorempixel.com/640/480/business', '112.4369', '12.4150', 'Totam cupiditate id unde. Fugiat saepe est assumenda aut nihil modi qui tempora et. Minima rem fugiat et nemo quibusdam eum nisi est voluptas. Dolorem eaque totam iste ut esse inventore. Placeat non molestiae dolores occaecati eos consectetur alias.\n \rPlaceat maxime quis. Eum in et. Aliquid nostrum quis ut sint quo. Saepe voluptas saepe dolorem esse sit. Neque velit explicabo est autem corporis quia.\n \rVoluptatem autem dolor. Ea perferendis perferendis maiores. Occaecati ipsum architecto. Repellendus velit rem facere possimus qui. Minima eos esse ipsam hic delectus. Deleniti rerum exercitationem unde aut enim hic.', 4, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(4, 'Dietrich, Ortiz and Lowe', 'http://lorempixel.com/640/480/business', '88.6279', '6.5101', 'Ducimus sapiente ut voluptates earum esse sit. Sit quisquam animi omnis sint eum ab sed. Dolor fugit non porro. Quia magnam nesciunt eos occaecati qui non. Odit quaerat asperiores qui non ut vero modi sint quidem.\n \rSint animi sint nihil. Quas qui placeat. Et possimus mollitia rerum voluptas fugiat quo. Accusamus exercitationem eius. Dolorem hic reiciendis quibusdam cumque culpa quibusdam quia. Illo autem maiores minus molestiae delectus non debitis.\n \rOccaecati odio omnis voluptatem sed ipsam. Veritatis eum eum et ipsum aspernatur delectus. Sequi nam labore autem ad adipisci pariatur veniam. Quos aut consequuntur est voluptas quasi fuga ad nam. Sit eos sit facere soluta reprehenderit.', 5, '2019-12-29 09:07:18', '2019-12-29 09:07:18');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `rating` int(1) DEFAULT NULL,
  `review` text,
  `item_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `rating`, `review`, `item_id`, `user_id`, `created_at`, `updated_at`) VALUES
(244, 4, 'Iusto ex rerum rerum sit.', 1, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(245, 2, 'Autem vel in totam similique.', 2, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(246, 3, 'Qui et ea sit corporis.', 3, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(247, 1, 'Sed dolor natus qui amet.', 4, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(248, 4, 'Saepe autem ut est molestiae.', 5, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(249, 2, 'Dignissimos et laboriosam rerum atque.', 6, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(250, 1, 'Praesentium labore velit tempore eos.', 7, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(251, 5, 'Veniam itaque deleniti quisquam doloremque.', 8, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(252, 1, 'Reiciendis nulla ipsam impedit distinctio.', 9, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(253, 4, 'Enim tempore minus nemo quis.', 10, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(254, 1, 'Aspernatur sed quibusdam expedita dolorum.', 11, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(255, 2, 'Officiis eveniet fugiat enim molestiae.', 12, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(256, 3, 'Officia libero molestiae quasi quisquam.', 13, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(257, 1, 'Et et vitae rem eum.', 14, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(258, 2, 'Qui et quasi qui est.', 15, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(259, 1, 'Perspiciatis consequatur repellendus non quam.', 16, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(260, 4, 'Ea dolor quisquam explicabo architecto.', 17, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(261, 2, 'Vel ea eos voluptas aliquid.', 18, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(262, 4, 'Nisi quo nihil sit doloremque.', 19, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(263, 3, 'Vel quia ducimus illo reprehenderit.', 20, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(264, 1, 'Dignissimos hic sint consequatur aspernatur.', 21, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(265, 1, 'Et placeat autem ipsa iste.', 22, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(266, 2, 'Impedit consequatur sint minima repellendus.', 23, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(267, 1, 'Ex unde voluptas impedit doloremque.', 24, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(268, 4, 'Cumque cumque in et corporis.', 25, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(269, 2, 'Quis sed cumque quam beatae.', 26, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(270, 2, 'Illum praesentium ea et velit.', 27, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(271, 2, 'Id aspernatur voluptatum dolor inventore.', 28, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(272, 5, 'Qui sed aspernatur sit quo.', 29, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(273, 2, 'Aliquam recusandae aut molestiae expedita.', 30, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(274, 5, 'Et esse quo est voluptatum.', 31, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(275, 2, 'Inventore rem est quia ex.', 32, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(276, 4, 'A libero atque esse aliquid.', 33, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(277, 5, 'Quis beatae voluptatem voluptas in.', 34, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(278, 3, 'Optio quam quidem ut velit.', 35, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(279, 1, 'Quas sapiente quis repellat consequuntur.', 36, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(280, 4, 'Excepturi dolore occaecati quidem consequatur.', 37, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(281, 2, 'Tempore quis aut asperiores neque.', 38, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(282, 3, 'Possimus quisquam rerum in unde.', 39, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(283, 3, 'Illum id ut aut qui.', 40, 6, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(284, 5, 'Tempora qui dicta autem eligendi.', 1, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(285, 4, 'Tenetur vero quia rerum libero.', 2, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(286, 1, 'Doloribus in delectus vero nihil.', 3, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(287, 2, 'Et maxime voluptatem nam pariatur.', 4, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(288, 4, 'Fugiat quo qui perspiciatis voluptatem.', 5, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(289, 5, 'Autem suscipit sequi et aut.', 6, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(290, 2, 'Et ipsum dignissimos harum officia.', 7, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(291, 2, 'Aut aliquam inventore nostrum deserunt.', 8, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(292, 2, 'Totam rerum sit placeat voluptas.', 9, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(293, 5, 'Debitis eligendi quia esse qui.', 10, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(294, 4, 'Blanditiis omnis quod voluptatem accusantium.', 11, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(295, 1, 'Laborum explicabo voluptatibus ducimus quae.', 12, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(296, 5, 'Quis non molestiae aut dolorem.', 13, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(297, 2, 'Quasi vel exercitationem a nisi.', 14, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(298, 5, 'Labore dolorum explicabo odio culpa.', 15, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(299, 3, 'Illum consequatur in quis non.', 16, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(300, 3, 'Non consequatur vel asperiores dolorem.', 17, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(301, 1, 'Et praesentium facilis dicta magni.', 18, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(302, 5, 'Qui eveniet repellat vel sunt.', 19, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(303, 2, 'Non veniam corrupti earum enim.', 20, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(304, 5, 'Voluptas et aut assumenda excepturi.', 21, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(305, 3, 'Optio non corrupti omnis eaque.', 22, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(306, 2, 'Et incidunt reprehenderit voluptatem qui.', 23, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(307, 3, 'Non saepe excepturi ut et.', 24, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(308, 1, 'Dolor vero enim nemo nostrum.', 25, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(309, 5, 'Maxime ipsam molestiae dolores ea.', 26, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(310, 2, 'Dolores non consequatur quo quidem.', 27, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(311, 2, 'Atque iure possimus culpa accusantium.', 28, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(312, 3, 'Sed est ipsa quia recusandae.', 29, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(313, 3, 'Minima modi molestiae laboriosam voluptas.', 30, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(314, 2, 'Pariatur rerum nobis dolor quia.', 31, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(315, 3, 'Molestiae soluta quisquam est voluptate.', 32, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(316, 4, 'Vel quae earum molestiae culpa.', 33, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(317, 2, 'Et itaque omnis debitis sapiente.', 34, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(318, 4, 'Ea placeat veritatis natus nemo.', 35, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(319, 3, 'Est sunt sit et et.', 36, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(320, 3, 'Et possimus dolores ipsam ipsa.', 37, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(321, 4, 'Est et molestiae quam accusantium.', 38, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(322, 4, 'Facere fugiat eum voluptatibus neque.', 39, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(323, 3, 'Placeat aut labore sit nihil.', 2, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(324, 5, 'Asperiores vel adipisci molestias et.', 3, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(325, 2, 'Debitis repellendus sit eum et.', 1, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(326, 1, 'Minima optio sint quam aperiam.', 40, 7, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(327, 5, 'Expedita sit autem rerum possimus.', 4, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(328, 2, 'Nobis est inventore dolore ut.', 5, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(329, 2, 'Sunt nisi nihil debitis debitis.', 6, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(330, 3, 'A consequuntur maxime et et.', 7, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(331, 5, 'Voluptatem rerum modi itaque culpa.', 8, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(332, 2, 'Architecto dolor nihil et ex.', 9, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(333, 5, 'Cumque alias hic ducimus eum.', 10, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(334, 3, 'Fugiat repellat iste laudantium quae.', 11, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(335, 4, 'Doloremque temporibus repellat et perspiciatis.', 12, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(336, 1, 'Totam illo nostrum deserunt quasi.', 13, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(337, 4, 'Est cupiditate beatae reprehenderit voluptatem.', 14, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(338, 5, 'Quia ut iusto aut ut.', 15, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(339, 4, 'Aut aut accusantium repudiandae facilis.', 16, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(340, 4, 'Fuga aut quia sit numquam.', 17, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(341, 1, 'Libero sunt id sequi doloribus.', 18, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(342, 5, 'Est dolorem velit harum dolores.', 19, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(343, 1, 'Veniam accusantium totam qui ut.', 20, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(344, 1, 'Asperiores eligendi laboriosam velit molestias.', 21, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(345, 4, 'Ut modi quia autem ea.', 22, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(346, 4, 'Iste facere aliquid dignissimos voluptas.', 23, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(347, 1, 'Quia dolore ad nihil soluta.', 24, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(348, 4, 'Quod officia aliquid suscipit nihil.', 25, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(349, 2, 'Assumenda quos asperiores qui quo.', 26, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(350, 2, 'Laboriosam ut possimus dolorem corrupti.', 27, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(351, 1, 'Quis ex minus et consequatur.', 28, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(352, 5, 'Quos occaecati qui sequi numquam.', 29, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(353, 2, 'Assumenda ipsa quas aut porro.', 30, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(354, 1, 'Laborum possimus rerum qui magnam.', 31, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(355, 2, 'Eveniet voluptas est nam dolor.', 32, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(356, 1, 'Voluptatem numquam dolor dolor consequatur.', 33, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(357, 4, 'Dicta molestias eveniet et velit.', 35, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(358, 3, 'Quam iure molestiae doloribus quos.', 34, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(359, 4, 'Aperiam ratione nemo qui qui.', 36, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(360, 5, 'Accusantium veritatis qui dignissimos impedit.', 37, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(361, 4, 'Non ipsum est omnis qui.', 38, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(362, 2, 'Dolores provident cum voluptatem facere.', 39, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(363, 5, 'Blanditiis adipisci dolor in molestiae.', 40, 8, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(364, 5, 'Repellendus a fugiat molestiae voluptates.', 1, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(365, 3, 'Facere eius quis nesciunt nulla.', 2, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(366, 5, 'Qui tenetur qui veniam praesentium.', 3, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(367, 1, 'Quo eos nihil ipsam enim.', 4, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(368, 5, 'Voluptas quis sed aut repudiandae.', 5, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(369, 1, 'Et eos quasi sit ut.', 6, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(370, 1, 'Aut repellat omnis incidunt debitis.', 7, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(371, 3, 'Nihil perferendis sit dolorem ea.', 8, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(372, 2, 'Earum ducimus quis voluptatem in.', 9, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(373, 1, 'Soluta quis sed magnam expedita.', 10, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(374, 3, 'Ipsum magnam laboriosam qui atque.', 11, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(375, 3, 'Voluptatem molestiae inventore quas voluptatem.', 12, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(376, 3, 'Voluptatem debitis nihil praesentium quidem.', 13, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(377, 3, 'Qui et eligendi consequatur repudiandae.', 14, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(378, 2, 'Numquam corporis dolorum sed voluptas.', 15, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(379, 2, 'Aut voluptas id delectus aliquam.', 16, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(380, 5, 'Nostrum quo sed incidunt dolores.', 17, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(381, 2, 'Consequatur reprehenderit est neque voluptas.', 18, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(382, 2, 'Adipisci voluptatem sunt facilis quas.', 19, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(383, 1, 'Soluta suscipit totam libero consequatur.', 20, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(384, 5, 'Mollitia ut et modi est.', 21, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(385, 5, 'Explicabo ad eum fugiat ipsum.', 22, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(386, 2, 'Hic dolore ipsa id laboriosam.', 23, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(387, 4, 'Ea possimus aliquid provident consequuntur.', 24, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(388, 3, 'Dolorum debitis aut eligendi qui.', 25, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(389, 5, 'Reprehenderit minus quis eveniet explicabo.', 26, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(390, 2, 'Deserunt esse harum quis eos.', 27, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(391, 4, 'Asperiores fugit distinctio expedita qui.', 28, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(392, 2, 'Est quidem officiis quam quia.', 29, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(393, 5, 'Sunt ut repellat debitis quaerat.', 30, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(394, 5, 'Omnis molestiae eum soluta doloremque.', 31, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(395, 3, 'Reiciendis ex voluptatibus officiis hic.', 32, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(396, 4, 'Dolor voluptas sed harum porro.', 33, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(397, 3, 'Quo aut neque quasi qui.', 34, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(398, 4, 'Placeat asperiores eos numquam labore.', 35, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(399, 3, 'Ut quia cum occaecati quo.', 36, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(400, 1, 'Cupiditate reiciendis ea quam ex.', 37, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(401, 4, 'Cumque sunt ut omnis aut.', 38, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(402, 4, 'Ea quibusdam aut quis sequi.', 39, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(403, 3, 'Nulla odio sapiente voluptatem deserunt.', 40, 9, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(404, 5, 'Non ipsum quas repellat voluptatem.', 1, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(405, 1, 'Quod praesentium corporis voluptates adipisci.', 2, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(406, 4, 'Et laborum et eius possimus.', 3, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(407, 4, 'Dolorum eveniet aut atque at.', 4, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(408, 3, 'Vel blanditiis ea pariatur aut.', 5, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(409, 3, 'Iure illo qui ducimus est.', 6, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(410, 5, 'Placeat ut repellendus numquam occaecati.', 7, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(411, 4, 'Voluptatem laborum enim et cupiditate.', 8, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(412, 1, 'Cumque quae architecto dolor suscipit.', 9, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(413, 1, 'Cum et sapiente officiis sit.', 10, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(414, 2, 'Enim vero veniam omnis deleniti.', 11, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(415, 3, 'Fugit et velit sint blanditiis.', 12, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(416, 5, 'Porro eligendi ut quia recusandae.', 13, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(417, 3, 'Qui cumque fuga pariatur excepturi.', 14, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(418, 1, 'Cupiditate consequatur optio sunt ut.', 15, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(419, 1, 'At eaque magnam sapiente architecto.', 16, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(420, 4, 'Occaecati sequi facere amet ipsa.', 17, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(421, 2, 'Quibusdam eos dignissimos rerum aut.', 18, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(422, 4, 'Minima et nulla reiciendis et.', 19, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(423, 4, 'Dolore nihil atque voluptatem tempora.', 20, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(424, 4, 'Voluptas omnis quia iure soluta.', 21, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(425, 1, 'Soluta distinctio consequuntur nam quia.', 22, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(426, 2, 'Voluptates laboriosam iure eos sed.', 23, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(427, 1, 'Dolorem esse sit odio dolor.', 26, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(428, 3, 'Rem laboriosam quo assumenda neque.', 28, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(429, 1, 'Qui dolor pariatur asperiores quas.', 27, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(430, 3, 'Nisi rerum dolores quis quis.', 29, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(431, 2, 'Consequuntur sit impedit illum maiores.', 24, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(432, 3, 'Quo eius nihil consequuntur dicta.', 30, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(433, 1, 'Repellendus temporibus voluptatem ut architecto.', 31, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(434, 4, 'Omnis animi laudantium eos temporibus.', 25, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(435, 5, 'Id odit odit saepe nulla.', 33, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(436, 1, 'Iusto fuga minima corporis error.', 32, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(437, 3, 'Perferendis cupiditate assumenda incidunt autem.', 34, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(438, 1, 'Quam dolorum ut tempore veritatis.', 35, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(439, 3, 'Accusamus delectus qui temporibus dicta.', 36, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(440, 3, 'Ab consequatur iure quis quisquam.', 37, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(441, 5, 'Omnis repellat temporibus fugit repudiandae.', 38, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(442, 2, 'Et itaque delectus eius id.', 39, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(443, 5, 'Incidunt nobis velit et molestiae.', 40, 10, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(444, 2, 'Sit est animi dolorem ea.', 1, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(445, 3, 'Unde impedit est est corrupti.', 2, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(446, 1, 'Enim et molestiae minima nemo.', 3, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(447, 3, 'Nostrum iste impedit officiis eos.', 4, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(448, 4, 'Atque voluptas sapiente nesciunt iusto.', 5, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(449, 1, 'Beatae cumque et consectetur optio.', 6, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(450, 1, 'Optio qui saepe et nam.', 7, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(451, 1, 'Molestiae aut et ut laboriosam.', 8, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(452, 2, 'Similique dolorem qui autem voluptatum.', 9, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(453, 3, 'Dolores ut eum ducimus qui.', 10, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(454, 1, 'Quis voluptatem impedit rerum omnis.', 11, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(455, 4, 'Voluptatem aliquid sunt expedita in.', 12, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(456, 5, 'Ea dolor illo quo aut.', 13, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(457, 2, 'Quod voluptatum corrupti itaque et.', 14, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(458, 1, 'Optio cumque porro exercitationem cupiditate.', 15, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(459, 1, 'Assumenda est consequuntur omnis qui.', 16, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(460, 4, 'Non laborum dolorum rerum et.', 17, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(461, 3, 'Sint enim quos saepe dicta.', 18, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(462, 1, 'Velit repudiandae unde deserunt voluptatum.', 19, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(463, 2, 'Magni pariatur omnis sed laborum.', 20, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(464, 4, 'Doloribus fugit harum asperiores tempore.', 21, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(465, 2, 'Aliquam earum aut veniam doloremque.', 22, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(466, 3, 'Ea eius ea exercitationem beatae.', 23, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(467, 5, 'Et voluptas vero fugiat velit.', 24, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(468, 5, 'Voluptatem eveniet voluptatibus est quas.', 25, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(469, 1, 'Nam officiis tempore qui nulla.', 26, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(470, 2, 'Accusamus accusantium sit rerum molestiae.', 27, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(471, 2, 'Accusantium consectetur vero dolores vitae.', 28, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(472, 1, 'Totam neque quia repellat sit.', 29, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(473, 3, 'Sed tenetur quod error et.', 30, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(474, 2, 'Qui aliquid recusandae earum sed.', 31, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(475, 2, 'Repellat nesciunt est numquam reprehenderit.', 32, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(476, 4, 'Repellat adipisci ducimus consequatur necessitatibus.', 33, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(477, 3, 'Qui repellendus sit omnis ipsam.', 34, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(478, 1, 'Quia voluptates et repellendus non.', 35, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(479, 2, 'Architecto sint molestias accusamus repellat.', 36, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(480, 5, 'Nulla voluptatem ut repellat commodi.', 37, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(481, 1, 'Aspernatur quidem maxime eveniet ratione.', 38, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(482, 3, 'Repellat debitis rem autem qui.', 39, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19'),
(483, 3, 'Ut fugiat veniam expedita voluptate.', 40, NULL, '2019-12-29 09:07:19', '2019-12-29 09:07:19');

-- --------------------------------------------------------

--
-- Table structure for table `revoked_token`
--

CREATE TABLE `revoked_token` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `is_revoked` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `revoked_token`
--

INSERT INTO `revoked_token` (`id`, `token`, `is_revoked`, `created_at`, `updated_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IktlbnRvbiBCb2VobSIsInVzZXJuYW1lIjoiRmxldGNoZXIuRGlja2k3Iiwicm9sZV9pZCI6MSwiaWF0IjoxNTc3NTUzMjQxfQ.ilzD6b4YA2QXCzHpIoZbjxBhPS3hgn2vr1a4a0ulBYg', 0, '2019-12-29 00:14:01', NULL),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdDEiLCJ1c2VybmFtZSI6InRlc3Rfb25lIiwicm9sZV9pZCI6MywiaWF0IjoxNTc3NTgyODIwfQ.J9I3QKNutP9_tsy-D14JkS29KiIUw1X96614p8-yS_I', 0, '2019-12-29 08:27:01', NULL),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJUZXN0MSIsInVzZXJuYW1lIjoidGVzdF9vbmUiLCJyb2xlX2lkIjpudWxsLCJpYXQiOjE1Nzc1ODMxMTB9.YEPYz0ORrjl30-LVqDyn2QuRtnrBRytMpNvV94vDxZE', 0, '2019-12-29 08:31:50', NULL),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJUZXN0MSIsInVzZXJuYW1lIjoidGVzdF9vbmUiLCJyb2xlX2lkIjpudWxsLCJpYXQiOjE1Nzc1ODMxNjZ9.ffMYgHq71WFyA1HFxzGLlCG_CgEj1uGXpGtO14X5gzE', 1, '2019-12-29 08:32:47', NULL),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdDIiLCJ1c2VybmFtZSI6InRlc3RfdHdvIiwicm9sZV9pZCI6MywiaWF0IjoxNTc3NTgzMzAxfQ.Ymz14sPSSKlnqJoKFANfH7NSilVrw4OQSLfzQZUPyPc', 0, '2019-12-29 08:35:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'administrator', 'administrator'),
(2, 'restaurant', 'restaurant'),
(3, 'customer', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Helena Daugherty', 'Winifred_Senger', '$2a$10$YYz9I50tEnYuN3Nkik/e4OeQWBDJRglNypW0.OIi2pqJmCG6sN9R.', 1, '2019-12-29 09:07:15', '2019-12-29 09:07:15'),
(2, 'Eulalia Wunsch', 'Glenda10', '$2a$10$/NNOHSO1HHmtPlclp/xmpuSeSMZszv.4RTejEHT0EWglSkP1d8rHi', 2, '2019-12-29 09:07:15', '2019-12-29 09:07:15'),
(3, 'Zoey Marquardt', 'Lucas_Schaden', '$2a$10$woeVM5iL5mSiz7aOarMN2OBMe8Y.9f5C9Uj460LCq8Mg9YfMAP8x6', 2, '2019-12-29 09:07:16', '2019-12-29 09:07:16'),
(4, 'Korbin Bailey', 'Terry73', '$2a$10$0bRUECFXE.fCMtLhI3tah.VtchhQYJoWS3HCQjazmZSkD.1BvN7fi', 2, '2019-12-29 09:07:16', '2019-12-29 09:07:16'),
(5, 'Wilber Collins', 'Roberta_Runte1', '$2a$10$80QJRhTK8JeR/yPeaCddteY5aEqU0svVvBXMWc2adJJ5WzhZPbI6S', 2, '2019-12-29 09:07:16', '2019-12-29 09:07:16'),
(6, 'Jacquelyn Cruickshank', 'Briana.Wintheiser1', '$2a$10$SvlPFRvdYFwvCUzEGdmrQ.DgsbkbF.5kKyHmKS16cGVb512wZMZ/m', 3, '2019-12-29 09:07:17', '2019-12-29 09:07:17'),
(7, 'Allison Thompson', 'Alexzander.McKenzie', '$2a$10$Xba18NlMCYvo.sBDnmd/jOXNLxEF32JeqaHOTsrnZkRDLI5.a7OcK', 3, '2019-12-29 09:07:17', '2019-12-29 09:07:17'),
(8, 'Archibald Reilly', 'Derick38', '$2a$10$QfAp4Q7wX/CMnBwYYPDCK..akEb47EtlLBTDYsqBxpuBjf4vCmbaq', 3, '2019-12-29 09:07:17', '2019-12-29 09:07:17'),
(9, 'Titus Kuhn Jr.', 'Marcel33', '$2a$10$Jgt5APDh3I8COc/YJiB23.PK8YC5GKaV5IRqcVxwr9brow7UzfRka', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18'),
(10, 'Maynard Gaylord', 'Harrison31', '$2a$10$0DUZJKIp0N6C9QQOwNIQr.YxZAakx/THfytmmtwcNroNucC9kjr1a', 3, '2019-12-29 09:07:18', '2019-12-29 09:07:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_item_id_foreign` (`item_id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `item_category`
--
ALTER TABLE `item_category`
  ADD KEY `item_category_item_id_foreign` (`item_id`),
  ADD KEY `item_category_category_id_foreign` (`category_id`);

--
-- Indexes for table `item_images`
--
ALTER TABLE `item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_images_item_id_foreign` (`item_id`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurants_user_id_foreign` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_item_id_foreign` (`item_id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`);

--
-- Indexes for table `revoked_token`
--
ALTER TABLE `revoked_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `item_images`
--
ALTER TABLE `item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=484;
--
-- AUTO_INCREMENT for table `revoked_token`
--
ALTER TABLE `revoked_token`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item_category`
--
ALTER TABLE `item_category`
  ADD CONSTRAINT `item_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_category_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item_images`
--
ALTER TABLE `item_images`
  ADD CONSTRAINT `item_images_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
