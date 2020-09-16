USE [AccountDB1]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE or ALTER  PROCEDURE [dbo].[GetAccounts]

        AS  
    
            select * from Accounts 

        
GO

