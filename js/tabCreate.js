
/****************************单行表格生成******************************************/
function singleRowTable() {
    var TClass = {};
    var Tool = {};
    var DataStore = {};
    var Option = {};
    //创建头部
    Tool.createHeader = function(htmls, data) {//htmls  表格数据
        htmls.push('<thead class="tab-thead">');
        htmls.push('<tr>');
        for (var i in data) {
            htmls.push('<th  class="sortIco" onclick="singleRowTable("tableSort02")">' + data[i]+ '</th>');
        }
        htmls.push('</tr>');
        htmls.push('</thead>');
    };
    //创建行
    Tool.createRow = function(htmls, data) {
        htmls.push('<tr>');
        for (var i in data) {
            htmls.push('<td class="ws-tdToolTip">' + data[i] + '</td>');
        }
        htmls.push('</tr>');
    };
    //渲染
    Tool.render = function(id, tag) {//id header tag表格外层div class
        var htmls = [];
        var option = Option[id];
        if (option['title'] != null) {
            htmls.push('<div class="title">' + option['title'] + '</div>');
        }
        //添加表格
        htmls.push('<table class="tab-warp singleRowTable-warp tableSort02" id="tableSort02">');
        //    数据存储
        // Tool.createHeader(htmls, DataStore[id]['header']);//htmls  thead数据
        for (var i in DataStore[id]['header']) {
            Tool.createHeader(htmls, DataStore[id]['header'][i]);
        }
        for (var i in DataStore[id]['data']) {//DataStore表格外层div对象 idDataStore表格外层div
            Tool.createRow(htmls, DataStore[id]['data'][i]);
        }
        htmls.push('</table>');
        //添加拖动div
        htmls.push('<div id="box02">');
        htmls.push('</div>');

        tag.empty().append(htmls.join(''));
        Tool.setStyle(id, tag);
    };
    Tool.setStyle = function(id, tag) {
        var option = Option[id];
        tag.find('.title').css({

        });
        tag.find('table').css({
        });
        tag.find('th').css({
        });
        tag.find('tr td').css({
        });
        tag.find('tr:even td').css({
        });
        tag.find('tr:odd td').css({
        });
        if (option['rowHeight'] != null) {
        }
        if (option['columnWidth'] != null) {
        }
    };
    Tool.getValue = function(value, defalutValue) {
        (defalutValue)
        if (typeof value == 'undefined') {
            return defalutValue;
        } else {
            return value;
        }
    };
    TClass.init = function(option) {
        var id = option['id'];
        var tag = $('#' + id);
        var header = option['header'];
        var data = option['data'];
        DataStore[id] = {
            header: header,
            data: data
        };
        Option[id] = {
        };
        Tool.render(id, tag);
    };
    TClass.getValue = function(id, row, column) {
        return DataStore[id]['data'][row - 1][column - 1];
    };
    TClass.setValue = function(id, row, column, value) {
        DataStore[id]['data'][row - 1][column - 1] = value;
    };
    TClass.getValues = function(id) {
        return DataStore[id]['data'];
    };
    TClass.addRow = function(id, data) {
        DataStore[id]['data'].push(data);
    };
    TClass.deleteRow = function(id, row) {
        DataStore[id]['data'].splice(row - 1, 1);
    };
    TClass.getRowCount = function(id) {
        return DataStore[id]['data'].length;
    };
    TClass.render = function(id) {
        Tool.render(id, $('#' + id));
    };
    return TClass;
}
/***************************单行表格生成结束*******************************************/


/****************************多行表格生成******************************************/
function multiRowTable() {
    var TClass = {};
    var Tool = {};
    var DataStore = {};
    var Option = {};
    //创建头部
    Tool.createHeader = function(htmls, data) {
        htmls.push('<thead class="tab-thead">');
        htmls.push('<tr>');
        for (var i in data) {
            htmls.push('<th  class="sortIco" onclick="multiRowTabMethod("multiRowTab")">' + data[i] + '</th>');
        }
        htmls.push('</tr>');
        htmls.push('</thead>');
    };
    //创建行
    Tool.createRow = function(htmls, data) {
        htmls.push('<tr>');
        for (var i in data) {
            htmls.push('<td class="ws-tdToolTip">' + data[i] +'</td>');
        }
        htmls.push('</tr>');
    };

    Tool.render = function(id, tag) {
        var htmls = [];
        var option = Option[id];
        if (option['title'] != null) {
            htmls.push('<div class="title">' + option['title'] + '</div>');
        }
        //添加表格
        htmls.push('<table class="tab-warp multiRowTab-warp multiRowTab" id="multiRowTab">');
        // Tool.createHeader(htmls, DataStore[id]['header']);

        for (var i in DataStore[id]['header']) {
            Tool.createHeader(htmls, DataStore[id]['header'][i]);
        }
        for (var i in DataStore[id]['data']) {
            Tool.createRow(htmls, DataStore[id]['data'][i]);
        }
        htmls.push('</table>');
        //添加拖动div
        htmls.push('<div id="multiRowBox">');
        htmls.push('</div>');

        tag.empty().append(htmls.join(''));
        Tool.setStyle(id, tag);
    };
    Tool.setStyle = function(id, tag) {
        var option = Option[id];
        tag.find('.title').css({
        });
        tag.find('table').css({
        });
        tag.find('th').css({
        });
        tag.find('tr td').css({
        });
        tag.find('tr:even td').css({
        });
        tag.find('tr:odd td').css({
        });
        if (option['rowHeight'] != null) {
        }
        if (option['columnWidth'] != null) {

        }
    };
    Tool.getValue = function(value, defalutValue) {
        if (typeof value == 'undefined') {
            return defalutValue;
        } else {
            return value;
        }
    };
    TClass.init = function(option) {
        var id = option['id'];
        var tag = $('#' + id);
        var header = option['header'];
        var data = option['data'];
        DataStore[id] = {
            header: header,
            data: data
        };
        Option[id] = {
        };
        Tool.render(id, tag);
    };
    TClass.getValue = function(id, row, column) {
        return DataStore[id]['data'][row - 1][column - 1];
    };
    TClass.setValue = function(id, row, column, value) {
        DataStore[id]['data'][row - 1][column - 1] = value;
    };
    TClass.getValues = function(id) {
        return DataStore[id]['data'];
    };
    TClass.addRow = function(id, data) {
        DataStore[id]['data'].push(data);
    };
    TClass.deleteRow = function(id, row) {
        DataStore[id]['data'].splice(row - 1, 1);
    };
    TClass.getRowCount = function(id) {
        return DataStore[id]['data'].length;
    };
    TClass.render = function(id) {
        Tool.render(id, $('#' + id));
    };
    return TClass;
}
/***************************多行表格生成结束*******************************************/

