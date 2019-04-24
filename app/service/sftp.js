// 七牛JDK
'use strict';

const Service = require('egg').Service;
const Client = require('ssh2-sftp-client');
// const path = require('path');
const servers = new Client();
let sftp = null;

class SftpService extends Service {

    // init 初始化
    async init() {
        if (!sftp) {
            sftp = await this.connect();
            const loop = () => { sftp = null; };
            servers.on('end', loop);
            servers.on('error', loop);
        }
    }

    async connect() {
        return new Promise(resolve => {
            servers.connect({
                host: '111.230.186.207',
                port: '65522',
                username: 'root',
                password: '1vzFPu83xPbv',
            }).then(async () => {
                resolve(servers);
                // const result = await sftp.list('/data/down');
                // await sftp.fastGet('/data/performance/config/*.js', path.resolve(__dirname,'../../download/*.js'));
                // await sftp.mkdir('/data/down', false);
                // await sftp.fastPut(path.resolve(__dirname, '../../config/config.default.js'), '/data/down/config.default.js')
            });
        });
    }

    // 查看文件列表
    async list(remoteFilePath) {
        await this.init();
        return await sftp.list(remoteFilePath);
    }

    // 新增文件夹
    async mkdir(remoteFilePath, recursive) {
        await this.init();
        return await sftp.mkdir(remoteFilePath, recursive);
    }

    // 删除文件夹
    async rmdir(localPath, recursive) {
        await this.init();
        return await sftp.rmdir(localPath, recursive);
    }

    // 下载文件
    async fastGet(remotePath, localPath) {
        await this.init();
        return await sftp.fastGet(remotePath, localPath);
    }

    // 上传文件
    async fastPut(localPath, remotePath) {
        return await sftp.fastPut(localPath, remotePath);
    }

    // 删除文件
    async delete(remoteFilePath) {
        await this.init();
        return await sftp.delete(remoteFilePath);
    }

    // 文件重命名
    async rename(remoteSourcePath, remoteDestPath) {
        await this.init();
        return await sftp.rename(remoteSourcePath, remoteDestPath);
    }

    // 文件权限更改
    async chmod(remoteDestPath, mode) {
        await this.init();
        return await sftp.chmod(remoteDestPath, mode);
    }

    // 关闭窗口
    async end() {
        await this.init();
        return await sftp.end();
    }

}

module.exports = SftpService;
