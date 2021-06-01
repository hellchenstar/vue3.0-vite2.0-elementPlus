import EXIF from 'exif-js'; //用于获取拍摄图片的基本信息（例如：拍摄方向）

// dataUrl转为blob对象，用于formdata数据提交
function dataURItoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), //base-64编码过的字符串进行解码
    n = bstr.length,
    u8arr = new Uint8Array(n); //8 位无符号整数值的类型化数组
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}


export default function (file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    if (!file) {
      resolve(null);
      return;
    }
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        // 图片原始尺寸
        var originWidth = this.naturalWidth;
        var originHeight = this.naturalHeight;
        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        var maxWidth = 3000,
          maxHeight = 3000;
        // 目标尺寸
        var targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // 缩放图片需要的canvas
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 获取图片的拍摄方向（通过Exit.js 插件）
        let orient;
        EXIF.getData(image, () => {
          orient = EXIF.getTag(this, 'Orientation');
        });
        // 因为ios手机拍摄上传的图片会出现旋转的hack，这里需要特殊处理
        // 如果图片顺时针旋转了90度则调整下
        if (orient === 6) {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          context.rotate(Math.PI / 2);
          // (0,-imgHeight) 从旋转原理图那里获得的起始点
          context.drawImage(this, 0, -targetHeight, targetWidth, targetHeight);
        } else if (orient === 3) {
          context.rotate(Math.PI);
          context.drawImage(this, -targetWidth, -targetHeight, targetWidth, targetHeight);
        } else if (orient === 8) {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          context.rotate(3 * Math.PI / 2);
          // (0,-imgHeight) 从旋转原理图那里获得的起始点
          context.drawImage(this, -targetWidth, 0, targetWidth, targetHeight);
        } else {
          // 图片压缩
          context.drawImage(this, 0, 0, targetWidth, targetHeight);
        }
        //压缩后的图片base64 url
        var newUrl = canvas.toDataURL('image/png');
        var blob = dataURItoBlob(newUrl);
        resolve({ furl: newUrl, data: blob });
      };
    };
    reader.readAsDataURL(file);
  });
}