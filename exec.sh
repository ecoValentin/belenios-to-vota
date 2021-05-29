node . input candidates.csv out.csv
mkdir -p /tmp/count
cp candidates.csv /tmp/count/candidates.csv
cp out.csv /tmp/count/out.csv
cp input /tmp/count/input
docker run -it --volume /tmp/count:/data vota_cli --seats $2 --electiontype $1 --candidates /data/candidates.csv -x /data/out.csv --config /data/config.txt --protocol /data/protocol.txt
DIR=$(pwd)
cd /tmp/count && tar -czf $DIR/$1_$2_candidates_"$(date +"%d-%m-%y_%H-%M")".tar.gz *
