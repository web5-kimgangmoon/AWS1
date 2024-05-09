# nginx 기본 페이지 변경

ls -al로 확인가능
cd /etc/nginx/sites-application/default
들어오면 root /var/www/html로 기본설정되어있음

mac 운영체제에서
/opt/homebrew/etc/nginx/sites-available
sudo vi n nginx.conf

location / { root html; }
설치했던 nginx 실행
