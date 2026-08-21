CREATE TABLE `bugReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referenceCode` varchar(20) NOT NULL,
	`category` enum('build','launch','integration','documentation','other') NOT NULL,
	`severity` enum('low','normal','high','critical') NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` text NOT NULL,
	`reproductionSteps` text,
	`environmentDetails` text,
	`commandUsed` text,
	`contactEmail` varchar(320),
	`status` enum('new','reviewing','resolved') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bugReports_id` PRIMARY KEY(`id`),
	CONSTRAINT `bugReports_referenceCode_unique` UNIQUE(`referenceCode`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
