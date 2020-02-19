set -e
npm install
npm run generate
cd dist
echo 'burner.0xcert.org' > CNAME
git init
git add -A
git commit -m "Deploy website"
git push -f git@github.com:0xcert/burner.git master:gh-pages
cd -
echo '-----------------------'
echo '  Deployment complete. '
echo '-----------------------'