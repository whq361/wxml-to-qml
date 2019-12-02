// 使用方法为：
// 把该文件复制到要修改文件名的目录下；
// 然后打开node.js执行node changeName.js命令；
// 修改完成！
// 可以在下面注释的地方自定义修改的逻辑；
 
 
var fs = require('fs');
var path = require('path');
//解析需要遍历的文件夹，我的changName.js和target文件夹是同一个目录，target文件夹就是我要处理的文件夹
var filePath = path.resolve('./target');
 
 
//调用文件遍历方法
fileDisplay(filePath);
 
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
//   console.log(8977)
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir)
                            if (path.extname(filedir) === ".wxml") {
                                // results.push(path.resolve(__dirname, file))
                                fs.readFile(filedir, function(err, data) {
                                  //readFile回调函数
                                  if (err) throw err;
                                  let str = data.toString();
                                  str = str.replace(/wx:if/g, "qq:if");
                                  str = str.replace(/"wx:for-index/g, "qq:for-index");
                                  str = str.replace(/wx:for-item/g, "qq:for-item");
                                  str = str.replace(/wx:for/g, "qq:for");
                                  str = str.replace(/wx:key/g, "qq:key");
                                  fs.writeFile(filedir, str, function(err) {
                                    if (err) return console.error(err);
                                  });
                                });
                              }
                              if (path.extname(filedir) === ".js") {
                                fs.readFile(filedir, function(err, data) {
                                  //readFile回调函数
                                  if (err) throw err;
                                  let str = data.toString();
                                  str = str.replace(/wx./g, "qq.");
                                  fs.writeFile(filedir, str, function(err) {
                                    if (err) return err;
                                  });
                                });
                              }
                            if(filedir.indexOf('.wxss')!=-1){
                                filedir.replace('.wxss','.qss')
                                rename(filedir,filedir.replace('.wxss','.qss',function(){
                                }))
                            }
                            if(filedir.indexOf('.wxml')!=-1){
                                filedir.replace('.wxml','.qml')
                                rename(filedir,filedir.replace('.wxml','.qml',function(){
                                }))
                            }
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
 
 
 
// 修改文件名称
function rename (oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}