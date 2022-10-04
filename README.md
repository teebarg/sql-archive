# sql-archive
A CLI tool to archive sql databases


[![npm dependents](https://badgen.net/npm/dependents/sql-archive)](https://www.npmjs.com/package/sql-archive?activeTab=dependents)
[![Downloads](https://badgen.net/npm/dt/sql-archive)](https://www.npmjs.com/package/sql-archive)

<br>

---

<br>

## Install

```sh
npm install sql-archive
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


## Credentials
The DB could be passed to the cli inline or using a txt file. Example of the `.txt` file can be found in the repo.


## Usage

```sh
sqa archive -i sup.txt -t table_name -l 5000
sqa archive -u root -h db.host.com -p password -d database -t table -l 3000
```

## Windows

If you're on Windows, do yourself a favor and use [Windows Terminal](https://github.com/microsoft/terminal) instead of `cmd.exe`.


## Maintainer

- [Adeniyi Aderounmu](https://github.com/teebarg)
