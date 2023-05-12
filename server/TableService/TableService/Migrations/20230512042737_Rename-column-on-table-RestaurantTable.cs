using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TableService.Migrations
{
    /// <inheritdoc />
    public partial class RenamecolumnontableRestaurantTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TableNumber",
                table: "restaurant-table");

            migrationBuilder.AddColumn<string>(
                name: "TableName",
                table: "restaurant-table",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TableName",
                table: "restaurant-table");

            migrationBuilder.AddColumn<int>(
                name: "TableNumber",
                table: "restaurant-table",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
