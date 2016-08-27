-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 29-Dez-2015 às 21:13
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `collabeduc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `questoes`
--

CREATE TABLE IF NOT EXISTS `questoes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `alt_1` text NOT NULL,
  `alt_2` text NOT NULL,
  `alt_3` text NOT NULL,
  `alt_4` text NOT NULL,
  `video_id` int(10) unsigned NOT NULL,
  `ex_time` int(10) unsigned NOT NULL,
  `duration` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `questoes`
--

INSERT INTO `questoes` (`id`, `title`, `alt_1`, `alt_2`, `alt_3`, `alt_4`, `video_id`, `ex_time`, `duration`) VALUES
(1, 'Acerca de estruturas de dados do tipo vetor em linguagens estruturadas, assinale a alternativa correta.', 'Uma posição específica de um vetor pode ser acessada diretamente por meio de seu índice.', 'Vetores podem ser considerados como listas de informações armazenadas em posição não-contígua na memória.', 'Entre alguns tipos de estrutura de dados, não podem ser citados os vetores.\r\n', 'Vetores são utilizados quando estruturas indexadas necessitam de mais que um índice para identificar um de seus elementos.', 1, 10, 10),
(2, 'Qual a cor do cavalo branco de Napoleão?', 'Azul', 'Branca', 'Vermelha', 'NDA', 1, 30, 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `id` char(36) NOT NULL,
  `expires` date NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `session`
--

INSERT INTO `session` (`id`, `expires`, `user`) VALUES
('10975682dbda021669.83530124', '2015-12-29', 2),
('1135568137275371b3.70131472', '2015-12-28', 2),
('120915682dbd78d4ca5.00413426', '2015-12-29', 1),
('12364568136d2eb2499.12240861', '2015-12-28', 1),
('14465682dc071408f6.81924846', '2015-12-29', 3),
('231205682db1032e964.59524865', '2015-12-29', 1),
('238365682da64584d71.54624048', '2015-12-29', 2),
('23868568138c7cc7138.18111578', '0000-00-00', 1),
('280575682da62f1f322.51603257', '2015-12-29', 1),
('283125682dbfd5d8ab5.19538619', '2015-12-29', 2),
('29969568126db674743.79391147', '2015-12-28', 1),
('334256812c1b9be9b7.66386053', '0000-00-00', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula` int(10) unsigned NOT NULL,
  `nome` text NOT NULL,
  `email` char(254) NOT NULL,
  `password` char(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`,`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `matricula`, `nome`, `email`, `password`) VALUES
(1, 10821251, 'Edviges', 'edvigeslima@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413'),
(2, 10911040, 'José Ivan', 'joseivan@lavid.ufpb.br', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413'),
(3, 123456, 'Clauirton', 'clauirton@ci.ufpb.br', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413');

-- --------------------------------------------------------

--
-- Estrutura da tabela `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(4096) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `videos`
--

INSERT INTO `videos` (`id`, `path`) VALUES
(1, 'media/teste.mp4');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
