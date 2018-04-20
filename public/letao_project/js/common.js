
/**
 * 存放乐淘搜索数据
 * 以数组 json的形式存放 '[a,b,c]'
 */
function storageLeTaoSearch(localKey) {
  function getArrar() {
    var val = localStorage.getItem(localKey);
    var arr = [];
    if (val) {
      arr = JSON.parse(val);
    }
    return arr;
  }
  return {
    getArr: function () {
      return getArrar();
    },
    push: function (val) {
      val = val.trim();
      var arr = getArrar();
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (element == val) {
          return;
        }
      }
      var arr = getArrar();
      arr.push(val);
      localStorage.setItem(localKey, JSON.stringify(arr));
    },
    getItem: function (index) {
      return getArrar()[index];
    },
    isExists: function (val) {
      var arr = getArrar();
      for (var i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
          return true;
        }
      }
      return false;
    },
    removeItem: function (val) {
      var arr = getArrar();
      for (var i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
          arr.splice(i, 1);
          localStorage.setItem(localKey, JSON.stringify(arr));
        }
      }
    },
    clear: function () {
      localStorage.setItem(localKey, "");
    }
  };
}