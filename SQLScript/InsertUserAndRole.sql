USE [AccountDB]
GO

INSERT INTO [dbo].[AspNetRoles]
           ([Id]
           ,[Name]
           ,[NormalizedName])
     VALUES
           (1,'Admin','Admin')
GO
INSERT INTO [dbo].[AspNetRoles]
           ([Id]
           ,[Name]
           ,[NormalizedName])
     VALUES
           (2, 'Customer','Customer')
GO


INSERT INTO [dbo].[AspNetUsers]
           ([Id]
           ,[UserName]
           ,[NormalizedUserName]
           ,[Email]
           ,[NormalizedEmail]
           ,[EmailConfirmed]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[ConcurrencyStamp]
           ,[PhoneNumberConfirmed]
           ,[TwoFactorEnabled]

           ,[LockoutEnabled]
           ,[AccessFailedCount]
           ,[Discriminator]
           ,[FullName])
     VALUES
           (22,
           'user22',
           'USER22',
           'trung@gmail.com',
          'TRUNG@GMAIL.COM',
           0,
           'AQAAAAEAACcQAAAAEONXApOPh3kmUAbl78jtMEsbjbMbVgLrG7t53IYYucYgg49cyf4ln86Lfb4w7uJj3w==',
           'KV3KY54CTKV2OP2WXLUCP66ETYBCS2F7',
           'c5d1ac87-0e34-4d90-b0b0-57ee30bb8629',
           0,
           0,
           1,
           0,
          'ApplicationUser',
           'trung22')
GO

INSERT INTO [dbo].[AspNetUserRoles]
           ([UserId]
           ,[RoleId])
     VALUES
           (22,
           1)
GO


