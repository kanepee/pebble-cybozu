var url = "http://cb.kanata-jp.com/cbof65/k.cgi?_System=login&_Login=1&p=scPW&a=MGvrjYEauNbcuZQkiXqBiStD";
var id = "akitoshi";
var pw = "ykorik0";
var basicAuth = "YWtpdG9zaGk6eWtvcmlrMA==";

simply.style('small');
simply.scrollable(true);
simply.text({
  title: 'Cybozu',
  body: ''
}, true);

var loadCybozu = function () {
  ajax({
    url: url+'&_Name='+id+'&Password='+pw,
    headers: { Authorization: 'Basic '+basicAuth}
  }, function(data){
    var headline = data.split("\n");
    var count = 0;
    var hlbody = "";
    for(var i=0; i<headline.length; i++) {
      if(headline[i].match(/<hr>/)) {
        count++;
      }
      if((count == 1) && !headline[i].match(/<hr>/)) {
        headline[i] = headline[i].replace(/<a[^>]*>(.*)<\/a>/, "== $1 ==");
        hlbody = hlbody + headline[i].replace(/<[^>]*>/g, "") + "\n";
      }
    }
    simply.body(hlbody);
  });
};

simply.on('singleClick', function(e) {
  if(e.button == 'select') {
    loadCybozu();
  }
});

setTimeout(loadCybozu(), 500);
