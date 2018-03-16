We maintain search engine adapters for Solr and Elastic Search. The job of the adapter is to abstract out complexities of quering search engine to a common, easy-to-use standard.

A search adapter contains

1. Query builder - Build a query to be sent to search engine
2. Results parser - Parses the results from the search to a standard format
3. HTTP module - An ajax handler to transform requests to a format suitable to the search engine

