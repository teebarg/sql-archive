# sql-archive

A Command Line Interface (CLI) tool for archiving data from a MySQL database table.

[![npm dependents](https://badgen.net/npm/dependents/sql-archive)](https://www.npmjs.com/package/sql-archive?activeTab=dependents)
[![Downloads](https://badgen.net/npm/dt/sql-archive)](https://www.npmjs.com/package/sql-archive)

<br>

---

<br>

## Requirements

- Node.js installed on your system
- A MySQL database with a target table and an archive_target table
- The credentials to connect to the database (host, user, password, database name)

## Installation

```sh
npm install -g sql-archive

```

## Usage

```sh
sqa archive -i <input_file> -t <table_name> -l <limit> -z <date>

```

## Options

- -i, --input-file <input_file>: The input file that contains the database credentials (host, user, password, and database name).
- -t, --table-name <table_name>: The name of the table from which the data should be archived.
- -l, --limit <limit>: The number of rows to be archived (optional, default is 100).
- -z, --date <date>: The date before which the data should be archived (optional, default is 2022-01-01).

## Input file format

The input file should contain the following information, one per line:
The DB could be passed to the cli inline or using a txt file. Example of the `.txt` file can be found in the repo.

```txt
host, user, password, database
<host_name>, root, <password>, <database_name>

```

## Help

```sh
sqa help
```


## Tables

You need to create the archive table for the targeted tables
Sql archive use archived convention for naming it archive table

Examples:

- `products is archived to archived_products`
- `carts is archived to archived_carts`


## Example

To archive data from the carts table, with a limit of 2 rows and a date of 2022-06-01:

```sh
sqa archive -i sup.txt -t carts -l 2 -z 2022-06-01
sqa archive -i sup.txt -t table_name -l 5000
sqa archive -u root -h db.host.com -p password -d database -t table -l 3000
```

## Conclusion

The sql-archive tool provides a convenient way to archive data from a MySQL database table using the command line. It allows you to specify the input file with the database credentials, the name of the table from which to archive the data, the number of rows to be archived, and the date before which the data should be archived.

## Maintainer

- [Adeniyi Aderounmu](https://github.com/teebarg)
