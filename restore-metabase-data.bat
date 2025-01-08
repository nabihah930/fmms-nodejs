@echo off
echo Restoring Metabase data volume...
docker run --rm -v metabase-data:/metabase-data -v "%cd%\data":/backup alpine sh -c "cd /metabase-data && tar -xzf /backup/metabase-data.tar.gz"
echo Metabase data restored successfully!
