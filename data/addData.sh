# translates csv to json line by line with awk
cat data.csv | \
awk -F',' '{printf("{\"timestamp\": %s, \"vehicle_id\": \"%s\", \"session_id\": \"%s\", \"lat\": %s, \"lon\": %s, \"heading\": %s}\n", $1, $2, $3, $4, $5, $6)}' | \
while read s
do
    # !!! please check the port before running the script
    curl -H "Content-Type: application/json" -X POST -d "$s" http://localhost:10010/position?api_key=1234
    printf "\n" 
done

