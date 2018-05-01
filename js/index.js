/*
	author： laizhicheng(赖志成);
	time：2018-04-28
 */
window.ereaPlugin = function(obj){
	var EreaPlugin = function(){
		this.showEl = document.getElementById(obj.showEl.slice(1));
		this.clickEl = document.getElementById(obj.clickEl.slice(1));
		this.data = obj.data;
		this.showId = obj.showEl;
		this.clickId = obj.clickEl;
		this.erea_value = [];
		this.now_value = '';
		this.city_arr = null;
		this.erea_arr = null;
		this.county_arr = null;
		this.town_arr = null;
		this.tabsDom = [];
	}
	EreaPlugin.prototype.addEl = function(value,provateClass){
		var item_str = '<ul>';
		for(var i = 0;i<value.length;i++){
			item_str += '<li class="ereaPlugin_li ' + provateClass + '">'+value[i].name+'</li>'
		}
		item_str += '</ul>';
		return item_str;
	};
	EreaPlugin.prototype.provinceClick = function(thisText,data,value){
		this.erea_value[0] = thisText;
		this.now_value = thisText;
		for(var a=0;a<data.length;a++){
			if(data[a].name === thisText){
				this[value] = data[a].children;
				break;
			};
		};
	}
	EreaPlugin.prototype.cityClick = function(){
	}
	EreaPlugin.prototype.setEreaPlugin_line = function(dom){
		this.divLine.style.left = dom.offsetLeft + 'px';
		this.divLine.style.width = (Number(this.getStyle(dom,'width').slice(0,-2))+16) + 'px';
	}
	EreaPlugin.prototype.getStyle = function(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle( obj )[attr];
	}
	EreaPlugin.prototype.removeClass = function(dom,className){
		var str = dom.getAttribute('class');
		var arr = str.split(' ');
		for(var i=0;i<arr.length;i++){
			if(arr[i] === className){
				arr.splice(i,1);
				dom.setAttribute('class',arr.join(' '));
				break;
			}
		}
	}
	EreaPlugin.prototype.addClass = function(dom,className){
		var str = dom.getAttribute('class');
		dom.setAttribute('class',str+' '+className)	
	}
	EreaPlugin.prototype.showItem = function(num,show){
		var items = this.showEl.querySelectorAll('.ereaPulgin_item');
		for(var i = num;i<items.length;i++){
			items[i].parentNode.removeChild(items[i]);
			this['divTabsChild'+(i+1)].parentNode.removeChild(this['divTabsChild'+(i+1)]);
		};
		this.showEl.querySelector('.ereaPulgin_item.'+show).style.display = 'block';
	}
	EreaPlugin.prototype.countyClick = function(thisText){
		this.erea_value[3] = thisText;
		this.now_value = thisText;
		this.divTabsChild4.children[0].innerHTML = this.erea_value[3];
		obj.callBack&&obj.callBack(this)
	}
	EreaPlugin.prototype.init = function(){
		var showEl = this.showEl;
		var that = this;
		//background
		this.showEl.style.width = window.outerWidth + 'px';
		this.showEl.style.height = window.outerHeight + 'px';
		this.showEl.style.backgroundColor = 'rgba(0,0,0,0.5)';
		this.showEl.style.position = 'fixed';
		this.showEl.style.left = '0px';
		this.showEl.style.top = '0px';
		this.showEl.addEventListener('click',handleCancel);

		function handleCancel(){
			showEl.style.display = 'none';
		}

		that.divEl = document.createElement('div');
		that.divLine = document.createElement('div');
		that.divTimes = document.createElement('div');
		that.divEl.setAttribute('class','ereaPlugin_box');
		that.divLine.setAttribute('class','ereaPlugin_line');
		that.divTimes.setAttribute('class','ereaPlugin_times');
		that.divTimes.innerHTML = '&times;';
		that.divEl.style.width = window.outerWidth + 'px';
		that.divEl.addEventListener('click',function(event){
			event.cancelBubble = true;
		});
		that.divTimes.addEventListener('click',function(){
			that.showEl.style.display = 'none';
		})
		this.showEl.appendChild(that.divEl);
		this.showEl.appendChild(that.divLine);
		this.showEl.appendChild(that.divTimes);




		var divElChild = document.createElement('div');
		divElChild.setAttribute('class','ereaPlugin_box_child');
		divElChild.innerHTML = '所在地区';
		that.divEl.appendChild(divElChild);
		
		var divTabs = document.createElement('div');
		divTabs.setAttribute('class','ereaPlugin_tabs');
		divTabs.style.top = divElChild.offsetTop + 32 + 'px';
		that.divTabsChild = document.createElement('div');
		that.divTabsChild.setAttribute('class','ereaPlugin_tabs_child');
		var divTabsChild_span = document.createElement('span');
		divTabsChild_span.innerHTML = '请选择';
		that.divTabsChild.appendChild(divTabsChild_span);
		
		//添加类
		that.addClass(that.divTabsChild,'ereaPlugin_active')
		that.divEl.appendChild(divTabs);

		
		divTabs.appendChild(that.divTabsChild);
		//ereaPlugin_line的sytle
		that.divLine.style.top = divElChild.offsetTop + (29 + Number(that.getStyle(divTabs,'height').slice(0,-2))) + 'px';
		that.setEreaPlugin_line(that.divTabsChild);
		that.item = document.createElement('div');
		that.item.setAttribute('class','ereaPulgin_item province_item');
		that.item.innerHTML = that.addEl(that.data,'province');
		that.divEl.appendChild(that.item)

		var province = showEl.querySelectorAll('.province');
		that.divTabsChild.addEventListener('click',function(){
			that.showItem(1,'province_item');
			that.addClass(that.divTabsChild,'ereaPlugin_active');
			//ereaPlugin_line的sytle
			that.setEreaPlugin_line(that.divTabsChild);
		});
		for(var j = 0;j<province.length;j++){
			province[j].addEventListener('click',function(event){
				var thisText = this.innerText;
				that.provinceClick(thisText,that.data,'city_arr')
				divTabsChild_span.innerHTML = that.erea_value[0];
				if(divTabs.children.length>1){
					console.log(divTabs.children.length)
					for(var p=1;p<divTabs.children.length;p++){
						divTabs.removeChild(divTabs.children[p]);
					};
				};
				//往下一级添加内容并绑定到this对象中
				that.divTabsChild2 = document.createElement('div');
				that.divTabsChild2.setAttribute('class','ereaPlugin_tabs_child');
				var divTabsChild_span2 = document.createElement('span');
				divTabsChild_span2.innerHTML = '请选择';
				that.divTabsChild2.appendChild(divTabsChild_span2);
				divTabs.appendChild(that.divTabsChild2);
				that.item.style.display = 'none';
				that.item2 = document.createElement('div');
				that.item2.setAttribute('class','ereaPulgin_item city_item');
				that.item2.innerHTML = that.addEl(that.city_arr,'city');
				that.divEl.appendChild(that.item2);
				//添加和移除类
				that.removeClass(that.divTabsChild,'ereaPlugin_active');
				that.addClass(that.divTabsChild2,'ereaPlugin_active');
				//添加点击事件
				that.divTabsChild2.addEventListener('click',function(){
					that.showItem(2,'city_item');
					that.addClass(that.divTabsChild2,'ereaPlugin_active');
					//ereaPlugin_line的sytle
					that.setEreaPlugin_line(that.divTabsChild2);
				})
				//ereaPlugin_line的sytle
				that.setEreaPlugin_line(that.divTabsChild2);
				var cityEl = showEl.querySelectorAll('.city');
				for(var b = 0;b<cityEl.length;b++){
					cityEl[b].addEventListener('click',function(){
						var thisText = this.innerText;
						that.erea_value[1] = thisText;
						that.now_value = thisText;
						for(var a=0;a<that.city_arr.length;a++){
							if(that.city_arr[a].name === thisText){
								that.erea_arr = that.city_arr[a].children;
								break;
							}
						}
						divTabsChild_span2.innerHTML = that.erea_value[1];
						//往下一级添加内容并绑定到this对象中
						that.divTabsChild3 = document.createElement('div');
						that.divTabsChild3.setAttribute('class','ereaPlugin_tabs_child');
						var divTabsChild_span3 = document.createElement('span');
						divTabsChild_span3.innerHTML = '请选择';
						that.divTabsChild3.appendChild(divTabsChild_span3);
						divTabs.appendChild(that.divTabsChild3);
						that.item2.style.display = 'none';
						that.item3 = document.createElement('div');
						that.item3.setAttribute('class','ereaPulgin_item erea_item');
						that.item3.innerHTML = that.addEl(that.erea_arr,'erea');
						that.divEl.appendChild(that.item3)
						//添加和移除类
						that.removeClass(that.divTabsChild2,'ereaPlugin_active');
						that.addClass(that.divTabsChild3,'ereaPlugin_active');
						that.divTabsChild3.addEventListener('click',function(){
							that.showItem(3,'erea_item');
							that.addClass(that.divTabsChild3,'ereaPlugin_active');
							//ereaPlugin_line的sytle
							that.setEreaPlugin_line(that.divTabsChild3);
						})
						//ereaPlugin_line的sytle
						that.setEreaPlugin_line(that.divTabsChild3);
						var ereaEl = showEl.querySelectorAll('.erea');
						for(var c=0;c<ereaEl.length;c++){
							ereaEl[c].addEventListener('click',function(){
								var thisText = this.innerText;
								that.erea_value[2] = thisText;
								that.now_value = thisText;
								for(var a=0;a<that.erea_arr.length;a++){
									if(that.erea_arr[a].name === thisText){
										that.county_arr = that.erea_arr[a].children;
										break;
									}
								}
								divTabsChild_span3.innerHTML = that.erea_value[2];
								//往下一级添加内容并绑定到this对象中
								that.divTabsChild4 = document.createElement('div');
								that.divTabsChild4.setAttribute('class','ereaPlugin_tabs_child');
								var divTabsChild_span4 = document.createElement('span');
								divTabsChild_span4.innerHTML = '请选择';
								that.divTabsChild4.appendChild(divTabsChild_span4);
								divTabs.appendChild(that.divTabsChild4);
								that.item3.style.display = 'none';
								that.item4 = document.createElement('div');
								that.item4.setAttribute('class','ereaPulgin_item county_item');
								that.item4.innerHTML = that.addEl(that.county_arr,'county');
								that.divEl.appendChild(that.item4);
								//添加和移除类
								that.removeClass(that.divTabsChild3,'ereaPlugin_active');
								that.addClass(that.divTabsChild4,'ereaPlugin_active');
								//ereaPlugin_line的sytle
								that.setEreaPlugin_line(that.divTabsChild4);
								var countyEl = showEl.querySelectorAll('.county');
								for(var d = 0;d<countyEl.length;d++){
									countyEl[d].addEventListener('click',function(){
										that.countyClick(this.innerText);//ereaPlugin_line的sytle
										that.setEreaPlugin_line(that.divTabsChild4);
									})
								}
							})
						}
					})
				}
			})
		}
		var showId = this.showId.slice(1);
		this.clickEl.addEventListener('click',function(){
			document.getElementById(showId).style.display = 'block';
		})
		this.showEl.style.display = 'none';
	}
	return new EreaPlugin();
}
