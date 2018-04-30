/*
	author： laizhicheng(赖志成);
	time：2018-04-28
 */
window.ereaPlugin = function(obj){
	var EreaPlugin = function(){
		this.showEl = document.getElementById(obj.showEl.slice(1));
		this.clickEl = document.getElementById(obj.clickEl.slice(1));
		this.data = obj.data;
		// this.el = document.getElementById(obj.el);
	}
	EreaPlugin.prototype.init = function(){
		this.showEl.style.width = window.outerWidth + 'px';
		this.showEl.style.height = window.outerHeight + 'px';
		this.showEl.style.backgroundColor = 'rgba(0,0,0,0.5)';
		this.showEl.style.position = 'fixed';
		this.showEl.style.left = '0px';
		this.showEl.style.top = '0px';

		var divEl = document.createElement('div');
		divEl.addEventListener('selectstart',function(){
			return false;
		})
		divEl.setAttribute('class','ereaPlugin_box');
		divEl.style.width = window.outerWidth + 'px';
		this.showEl.appendChild(divEl)

		var divElChild = document.createElement('div');
		divElChild.setAttribute('class','ereaPlugin_box_child');
		divElChild.innerHTML = '所在地区';
		divEl.appendChild(divElChild);
		
		var divTabs = document.createElement('div');
		divTabs.setAttribute('class','ereaPlugin_tabs');
		divTabs.style.top = divElChild.offsetTop + 32 + 'px';
		console.log(divElChild.offsetTop)
		var divTabsChild = document.createElement('div');
		divTabsChild.setAttribute('class','ereaPlugin_tabs_child');
		divTabsChild.innerHTML = '广东省';
		divTabs.appendChild(divTabsChild);

		divEl.appendChild(divTabs);
		
		var item = document.createElement('div');
		item.setAttribute('class','ereaPulgin_item');
		var item_str = '<ul>';
		console.log(this.data)
		for(var i = 0;i<this.data.length;i++){
			item_str += '<li class="ereaPlugin_li">'+this.data[i].name+'</li>'
		}
		item.innerHTML = item_str + '</ul>';
		divEl.appendChild(item)

		console.log(document.querySelectorAll('.ereaPlugin_li').length)
		var province = document.querySelectorAll('.ereaPlugin_li');
		console.log(province.length)
		for(var j = 0;j<province,length;j++){
			console.log(province.length)
			province[j].addEventListener('click',function(){
				alert(999)
			})
			console.log(province[j])
		}
		this.clickEl.addEventListener('click',function(){
			alert(77)
		})
	}
	return new EreaPlugin();
}
