FROM ubuntu:16.04
ENV PYTHONBUFFERED 1
ADD . /code
WORKDIR /code
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak \
    && rm /code/dockerfiles/oj_web_server/jdk-8u151-linux-x64.tar.gz \
    && cp /code/dockerfiles/oj_web_server/sources.list /etc/apt/ \
    && mkdir -p /root/.pip/ \
    && cp /code/dockerfiles/oj_web_server/pip.conf /root/.pip/ \
    && apt-get update \
    && apt-get install --no-install-recommends -y libssl-dev nginx python-pip \ 
       nodejs libmysqlclient-dev python-setuptools build-essential python-dev \
    && pip install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple/ \
    && pip install -i https://mirrors.aliyun.com/pypi/simple/ -r dockerfiles/oj_web_server/requirements.txt \
    && apt-get purge -y --auto-remove build-essential python-dev\
    && rm -rf /var/lib/apt/lists/*
RUN python tools/release_static.py
CMD bash /code/dockerfiles/oj_web_server/run.sh
