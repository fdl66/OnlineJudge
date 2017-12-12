FROM ubuntu:16.04
ENV DEBIAN_FRONTEND noninteractive
COPY dockerfiles/judger/jdk-8u151-linux-x64.tar.gz /opt/ 
RUN mkdir -p /var/judger/run/ \
    && mkdir /var/judger/test_case/ \
    && mkdir /var/judger/code/ \
    && chmod -R 777 /var/judger/run/
COPY dockerfiles/judger/policy /var/judger/run/
COPY dockerfiles/judger/supervisord.conf /etc/
ADD . /var/judger/code
WORKDIR /var/judger/code/judge/
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak \
    && cp /var/judger/code/dockerfiles/oj_web_server/sources.list /etc/apt/ \
    && mkdir -p /root/.pip/ \
    && cp /var/judger/code/dockerfiles/oj_web_server/pip.conf /root/.pip/ \
    && apt-get update \
    && buildDeps=' \
		software-properties-common \
		python-software-properties \
		python-dev \
		git \
		libtool \
		python-pip \
		libtool \
		libseccomp-dev' \
    && apt-get -y install python gcc g++ net-tools iputils-ping python-pkg-resources $buildDeps\
    && cd /opt \
    && tar -xzvf jdk-8u151-linux-x64.tar.gz \
    && rm jdk-8u151-linux-x64.tar.gz \
    && mv jdk* jdk \
    && echo 'export JAVA_HOME=/opt/jdk && export JRE_HOME=${JAVA_HOME}/jre && export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib && export PATH=${JAVA_HOME}/bin:$PATH ' >> /root/.bashrc \
    && cd /tmp \
    && git clone -b master https://github.com/QingdaoU/Judger \
    && cd Judger \
    && python setup.py install \
    && pip install supervisor \
    && apt-get purge -y --auto-remove $buildDeps \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
CMD bash /var/judger/code/dockerfiles/judger/run.sh

