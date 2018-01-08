/**********************单行表格生成（json）拖动*******************************/
function singleRowTable(table,idx){
    var otable=document.getElementById("singleRowTable"),
        otody=otable.tBodies[0],//tBodies[]表格中所有 tbody 的一个数组,整个tbody
        otr=otody.rows,//otr--》tbody中的行
        tarr=[];//空数组
    for (var i = 1; i <otr.length; i++) {//遍历tbody的行
        tarr[i-1]=otr[i];//tbody的i
    };
    if(otody.sortCol==idx){//sortCol列排序
        tarr.reverse(); //颠倒数组中元素的顺序
    }else{
        tarr.sort(function(tr1,tr2){//数组排序
            var value1 = tr1.cells[idx].innerHTML;//单元格的一个数组
            var value2 = tr2.cells[idx].innerHTML;
            if(!isNaN(value1)&&!isNaN(value2)){ //检查参数是否是非数字值
                return value1-value2;
            }else{
                return value1.localeCompare(value2);//本地比较字符串,value1比较value2
            }
        })
    }
    var fragment = document.createDocumentFragment(); //创建新文档,节点对象包含所有属性和方法
    for (var i = 0; i <tarr.length; i++) {
        fragment.appendChild(tarr[i]);//向节点添加最后一个子节点
    };
    otody.appendChild(fragment);
    otody.sortCol=idx;//表格排序
}
//拖动函数
function singleRowTableDrag(table){
    var ochek=document.getElementById("singleRowTable"),//获取chenkbox
        otable=document.getElementById("tableSort02"),//获取table
        // otody=otable.tBodies[0],//tBodies[]表格中所有 tbody 的一个数组,整个tbody
        // oth=otody.getElementsByTagName("th"),//获取tbody的th标签
        // otd=otody.getElementsByTagName("td"),//获取tbody的td标签
        box02=document.getElementById("box02"),//获取box

        oth=otable.getElementsByTagName("th"),//获取tbody的th标签
        otd=otable.getElementsByTagName("td"),//获取tbody的td标签

        arrn=[];
    //表头遍历
    for (var i =0; i < oth.length; i++) {//遍历th
        oth[i].onmousedown=function(e){//按下鼠标按钮函数
            var e=e||window.event,
                target = e.target||e.srcElement,//兼容
                thW = target.offsetWidth,//当前拖动对象的宽度
                maxl=ochek.offsetWidth-thW,//表格外div的宽度减去当前拖动对象的宽度
                rows=otable.rows,
                ckL=ochek.offsetLeft,//当前对象的外边框到外层对象的内边框之间的距离
                disX=target.offsetLeft,
                _this=this,
                cdisX=e.clientX-ckL-disX; //clientX指针向对于浏览器页面的水平坐标
            for (var i = 0; i < rows.length; i++) {
                var op=document.createElement("p");
                op.innerHTML=rows[i].cells[this.cellIndex].innerHTML;
                box02.appendChild(op);
            };
            for (var i = 0; i < oth.length; i++) {//
                arrn.push(oth[i].offsetLeft);//向数组的末尾添加元素
            };
            box02.style.display="block";
            box02.style.width=thW+"px";
            box02.style.left=disX+"px";
            //未完成 还有事件没写
            document.onmousemove=function(e){//鼠标指针移动时
                var e=e||window.event,
                    target = e.target||e.srcElement,//target当前拖动的元素
                    thW = target.offsetWidth;
                box02.style.top=0;
                box02.style.left=e.clientX-ckL-cdisX+"px";
                if(box02.offsetLeft>maxl){
                    box02.style.left=maxl+"px";
                }else if(box02.offsetLeft<0){
                    box02.style.left=0;
                }
                target.style.fontWeight="bold";
                document.onselectstart=function(){return false};//onselectstart对象将要被选择时触发
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
            }
            document.onmouseup=function(e){//鼠标松开
                var e=e||window.event,
                    opr=box02.getElementsByTagName("p"),
                    oboxl=box02.offsetLeft+cdisX;
                for (var i = 0; i < arrn.length; i++) {
                    if(arrn[i]<oboxl){
                        var index=i;
                    }
                };
                //_this.cellIndex表示当前拖动的列序号
                //index表示被拖动到第几列
                //opr表示当前拖动列的拷贝
                for (var i = 0; i < rows.length; i++) {
                    rows[i].cells[_this.cellIndex].innerHTML="";
                    rows[i].cells[_this.cellIndex].innerHTML=rows[i].cells[index].innerHTML;
                    if(_this.cellIndex==1||rows[i].cells[_this.cellIndex].getAttribute('data-visible')=='true') {
                        rows[i].cells[_this.cellIndex].style.overflow = 'hidden';
                        rows[i].cells[_this.cellIndex].setAttribute('data-visible', '');
                        rows[i].cells[index].style.overflow = 'visible';
                        rows[i].cells[index].setAttribute('data-visible', 'true');
                    }
                    rows[i].cells[index].innerHTML="";
                    rows[i].cells[index].innerHTML=opr[i].innerHTML; //拖起放下的时候
                };
                box02.innerHTML="";
                arrn.splice(0,arrn.length);//拼接数组
                box02.style.display="none";
                document.onmousemove=null;
                document.onmouseup=null;
                document.onselectstart=function(){return false};
            }

        }
    };
    //表格tbody遍历
    for (var i = 0; i < otd.length; i++) {//遍历td
        otd[i].onmousedown=function(e){//按下鼠标按钮函数
            var e=e||window.event,
                target = e.target||e.srcElement,//兼容
                thW = target.offsetWidth,//当前拖动对象的宽度
                maxl=ochek.offsetWidth-thW,//表格外div的宽度减去当前拖动对象的宽度
                rows=otable.rows,
                ckL=ochek.offsetLeft,//当前对象的外边框到外层对象的内边框之间的距离
                disX=target.offsetLeft,
                _this=this,
                cdisX=e.clientX-ckL-disX; //clientX指针向对于浏览器页面的水平坐标
            for (var i = 0; i < rows.length; i++) {
                var op=document.createElement("p");
                op.innerHTML=rows[i].cells[this.cellIndex].innerHTML;
                box02.appendChild(op);
            };
            for (var i = 0; i < oth.length; i++) {//
                arrn.push(oth[i].offsetLeft);//向数组的末尾添加元素
            };
            box02.style.display="block";
            box02.style.width=thW+"px";
            box02.style.left=disX+"px";
            //未完成 还有事件没写
            document.onmousemove=function(e){//鼠标指针移动时
                var e=e||window.event,
                    target = e.target||e.srcElement,
                    thW = target.offsetWidth;
                box02.style.top=0;
                box02.style.left=e.clientX-ckL-cdisX+"px";
                if(box02.offsetLeft>maxl){
                    box02.style.left=maxl+"px";
                }else if(box02.offsetLeft<0){
                    box02.style.left=0;
                }
                document.onselectstart=function(){return false};//onselectstart对象将要被选择时触发
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
            }
            document.onmouseup=function(e){//鼠标松开
                var e=e||window.event,
                    opr=box02.getElementsByTagName("p"),
                    oboxl=box02.offsetLeft+cdisX;
                for (var i = 0; i < arrn.length; i++) {
                    if(arrn[i]<oboxl){
                        var index=i;
                    }
                };
                for (var i = 0; i < rows.length; i++) {
                    rows[i].cells[_this.cellIndex].innerHTML="";
                    rows[i].cells[_this.cellIndex].innerHTML=rows[i].cells[index].innerHTML;
                    rows[i].cells[index].innerHTML="";
                    rows[i].cells[index].innerHTML=opr[i].innerHTML;
                };
                box02.innerHTML="";
                arrn.splice(0,arrn.length);//拼接数组
                box02.style.display="none";
                document.onmousemove=null;
                document.onmouseup=null;
                document.onselectstart=function(){return false};
            }

        }
    };
}
singleRowTableDrag("tableSort02");//调用
/**********************单行表格生成（json）拖动结束*******************************/




/**********************多行表格生成（json）拖动*******************************/
function multiRowTabMethod(table,idx){
    var otable=document.getElementById("multiRowTable"),
        otody=otable.tBodies[0],//tBodies[]表格中所有 tbody 的一个数组,整个tbody
        otr=otody.rows,//otr--》tbody中的行
        tarr=[];//空数组
    console.log(otody.rows)
    for (var i = 1; i <otr.length; i++) {//遍历tbody的行
        tarr[i-1]=otr[i];//tbody的i
    };
    if(otody.sortCol==idx){//sortCol列排序
        tarr.reverse(); //颠倒数组中元素的顺序
    }else{
        tarr.sort(function(tr1,tr2){//数组排序
            var value1 = tr1.cells[idx].innerHTML;//单元格的一个数组
            var value2 = tr2.cells[idx].innerHTML;
            if(!isNaN(value1)&&!isNaN(value2)){ //检查参数是否是非数字值
                return value1-value2;
            }else{
                return value1.localeCompare(value2);//本地比较字符串,value1比较value2
            }
        })
    }
    var fragment = document.createDocumentFragment(); //创建新文档,节点对象包含所有属性和方法
    for (var i = 0; i <tarr.length; i++) {
        fragment.appendChild(tarr[i]);//向节点添加最后一个子节点
    };
    otody.appendChild(fragment);
    otody.sortCol=idx;//表格排序
}
//拖动函数
function multiRowTabDrag(table){
    var ochek=document.getElementById("multiRowTable"),//获取chenkbox
        otable=document.getElementById("multiRowTab"),//获取table
        multiRowBox=document.getElementById("multiRowBox"),//获取box

        oth=otable.getElementsByTagName("th"),//获取tbody的th标签
        otd=otable.getElementsByTagName("td"),//获取tbody的td标签

        arrn=[];
    //表头遍历
    for (var i = 0; i < oth.length; i++) {//遍历td
        oth[i].onmousedown=function(e){//按下鼠标按钮函数
            var e=e||window.event,
                target = e.target||e.srcElement,//兼容
                thW = target.offsetWidth,//当前拖动对象的宽度
                maxl=ochek.offsetWidth-thW,//表格外div的宽度减去当前拖动对象的宽度
                rows=otable.rows,
                ckL=ochek.offsetLeft,//当前对象的外边框到外层对象的内边框之间的距离
                disX=target.offsetLeft,
                _this=this,
                cdisX=e.clientX-ckL-disX; //clientX指针向对于浏览器页面的水平坐标
            for (var i = 0; i < rows.length; i++) {
                var op=document.createElement("p");
                op.innerHTML=rows[i].cells[this.cellIndex].innerHTML;
                multiRowBox.appendChild(op);
            };
            for (var i = 0; i < oth.length; i++) {//
                arrn.push(oth[i].offsetLeft);//向数组的末尾添加元素
            };
            multiRowBox.style.display="block";
            multiRowBox.style.width=thW+"px";
            multiRowBox.style.left=disX+"px";
            //未完成 还有事件没写
            document.onmousemove=function(e){//鼠标指针移动时
                var e=e||window.event,
                    target = e.target||e.srcElement,
                    thW = target.offsetWidth;
                multiRowBox.style.top=0;
                multiRowBox.style.left=e.clientX-ckL-cdisX+"px";
                if(multiRowBox.offsetLeft>maxl){
                    multiRowBox.style.left=maxl+"px";
                }else if(multiRowBox.offsetLeft<0){
                    multiRowBox.style.left=0;
                }
                target.style.fontWeight="bold";
                document.onselectstart=function(){return false};//onselectstart对象将要被选择时触发
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
            }
            document.onmouseup=function(e){//鼠标松开
                var e=e||window.event,
                    opr=multiRowBox.getElementsByTagName("p"),
                    oboxl=multiRowBox.offsetLeft+cdisX;
                for (var i = 0; i < arrn.length; i++) {
                    if(arrn[i]<oboxl){
                        var index=i;
                    }
                };
                for (var i = 0; i < rows.length; i++) {
                    console.log(_this.cellIndex);
                    rows[i].cells[_this.cellIndex].innerHTML="";
                    rows[i].cells[_this.cellIndex].innerHTML=rows[i].cells[index].innerHTML;
                    if(_this.cellIndex==1||rows[i].cells[_this.cellIndex].getAttribute('data-visible')=='true') {
                        rows[i].cells[_this.cellIndex].style.overflow = 'hidden';
                        rows[i].cells[_this.cellIndex].setAttribute('data-visible', '');
                        rows[i].cells[index].style.overflow = 'visible';
                        rows[i].cells[index].setAttribute('data-visible', 'true');
                    }
                    rows[i].cells[index].innerHTML="";
                    rows[i].cells[index].innerHTML=opr[i].innerHTML;
                };
                multiRowBox.innerHTML="";
                arrn.splice(0,arrn.length);//拼接数组
                multiRowBox.style.display="none";
                document.onmousemove=null;
                document.onmouseup=null;
                document.onselectstart=function(){return false};
            }

        }
    };
    //表格tbody遍历
    for (var i = 0; i < otd.length; i++) {//遍历td
        otd[i].onmousedown=function(e){//按下鼠标按钮函数
            var e=e||window.event,
                target = e.target||e.srcElement,//兼容
                thW = target.offsetWidth,//当前拖动对象的宽度
                maxl=ochek.offsetWidth-thW,//表格外div的宽度减去当前拖动对象的宽度
                rows=otable.rows,
                ckL=ochek.offsetLeft,//当前对象的外边框到外层对象的内边框之间的距离
                disX=target.offsetLeft,
                _this=this,
                cdisX=e.clientX-ckL-disX; //clientX指针向对于浏览器页面的水平坐标
            for (var i = 0; i < rows.length; i++) {
                var op=document.createElement("p");
                op.innerHTML=rows[i].cells[this.cellIndex].innerHTML;
                multiRowBox.appendChild(op);
            };
            for (var i = 0; i < oth.length; i++) {//
                arrn.push(oth[i].offsetLeft);//向数组的末尾添加元素
            };
            multiRowBox.style.display="block";
            multiRowBox.style.width=thW+"px";
            multiRowBox.style.left=disX+"px";
            //未完成 还有事件没写
            document.onmousemove=function(e){//鼠标指针移动时
                var e=e||window.event,
                    target = e.target||e.srcElement,
                    thW = target.offsetWidth;
                multiRowBox.style.top=0;
                multiRowBox.style.left=e.clientX-ckL-cdisX+"px";
                if(multiRowBox.offsetLeft>maxl){
                    multiRowBox.style.left=maxl+"px";
                }else if(multiRowBox.offsetLeft<0){
                    multiRowBox.style.left=0;
                }
                document.onselectstart=function(){return false};//onselectstart对象将要被选择时触发
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
            }
            document.onmouseup=function(e){//鼠标松开
                var e=e||window.event,
                    opr=multiRowBox.getElementsByTagName("p"),
                    oboxl=multiRowBox.offsetLeft+cdisX;
                for (var i = 0; i < arrn.length; i++) {
                    if(arrn[i]<oboxl){
                        var index=i;
                    }
                };
                for (var i = 0; i < rows.length; i++) {
                    rows[i].cells[_this.cellIndex].innerHTML="";
                    rows[i].cells[_this.cellIndex].innerHTML=rows[i].cells[index].innerHTML;
                    rows[i].cells[index].innerHTML="";
                    rows[i].cells[index].innerHTML=opr[i].innerHTML;
                };
                multiRowBox.innerHTML="";
                arrn.splice(0,arrn.length);//拼接数组
                multiRowBox.style.display="none";
                document.onmousemove=null;
                document.onmouseup=null;
                document.onselectstart=function(){return false};
            }

        }
    };
}
multiRowTabDrag("multiRowTab");//调用
/**********************多行表格生成（json）拖动结束*******************************/
