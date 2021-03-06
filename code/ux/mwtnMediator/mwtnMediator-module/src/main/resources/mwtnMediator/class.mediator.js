function MediatorConfig(obj) {
	if (obj !== undefined) {
		this.Name = obj.Name;
		this.DeviceType = obj.DeviceType;
		this.DeviceIp = obj.DeviceIp;
		this.TrapsPort = obj.TrapPort;
		this.IsNetConfConnected = obj.IsNCConnected;
		this.NeModel = obj.NeXMLFile;
		this.NetconfPort = obj.NcPort;
		this.PID = obj.pid;
		this.IsLocked = obj.islocked;
		this.Autorun = false;
		this.FirewallRuleActive = obj.fwactive;
		this.OpenDaylightConfigs = obj.ODLConfig;
	} else {
		this.Name ="";
		this.DeviceType = -1;
		this.DeviceIp = "";
		this.TrapsPort = 0;
		this.IsNetConfConnected = false;
		this.NeModel = "";
		this.NetconfPort = 0;
		this.PID =0;
		this.IsLocked = false;
		this.Autorun = false;
		this.FirewallRuleActive = false;
		this.OpenDaylightConfigs=[];
	}
	this.DeviceTypeString = this.getDeviceTypeString();

}
MediatorConfig.prototype.refreshData = function(obj)
{
	if(obj!==undefined)
	{
		//this.Name = obj.Name;
		this.DeviceType = obj.DeviceType;
		this.DeviceIp = obj.DeviceIp;
		this.TrapsPort = obj.TrapPort;
		this.IsNetConfConnected = obj.IsNCConnected;
		this.NeModel = obj.NeXMLFile;
		this.NetconfPort = obj.NcPort;
		this.PID = obj.pid;
		this.IsLocked = obj.islocked;
		this.Autorun = false;
		this.FirewallRuleActive = obj.fwactive;
		this.OpenDaylightConfigs = obj.ODLConfig;
	}
	this.DeviceTypeString = this.getDeviceTypeString();
}
MediatorConfig.prototype.getDeviceTypeString = function()
{
	var i;
	for(i=0;i<MediatorConfig.DeviceTypes.length;i++)
	{
		if(MediatorConfig.DeviceTypes[i].Value==this.DeviceType)
			return MediatorConfig.DeviceTypes[i].Name;
	}
	return "unknown";
}
MediatorConfig.DEVICETYPE_SIMULATOR =0;
MediatorConfig.DEVICETYPE_DW_HORIZON_COMPACT_PLUS = 1;
MediatorConfig.DEVICETYPE_DW_HORIZON_QUANTUM = 2;
MediatorConfig.DEVICETYPE_ELVA_1 = 3;

MediatorConfig.DeviceTypes=[
{Value:MediatorConfig.DEVICETYPE_SIMULATOR,Name:"Simulator"},
{Value:MediatorConfig.DEVICETYPE_DW_HORIZON_COMPACT_PLUS,Name:"DragonWave Compact Plus"},
{Value:MediatorConfig.DEVICETYPE_DW_HORIZON_QUANTUM,Name:"DragonWave Quantum"},
{Value:MediatorConfig.DEVICETYPE_ELVA_1,Name:"ELVA-1"}];

MediatorConfig.prototype.IsRunning = function() {
	return this.PID > 0;
}
MediatorConfig.prototype.TestParams = function() {
	if(this.Name===undefined || this.Name.length<=0)
		throw "Name is not given";
	// Name without spaces
	var inValidName = /\s/;
	if(inValidName.test(this.Name))
		throw "Name cannot have whitespaces";
	// DeviceType: int from 0 to ...
	if(this.DeviceType<=0 || this.DeviceType>MediatorConfig.DEVICETYPE_ELVA_1)
		throw "DeviceType is not set";
	// DeviceIp: valid IP-Address
	var validIpTest =/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
	if(!validIpTest.test(this.DeviceIp))
		throw "IP-Address is not valid";
	// TrapsPort: valid Port
	if(this.TrapsPort<=0 || this.TrapsPort>65535)
		throw "TrapsPort is not valid";
	// NeModel: valid XMLFilename
	if(this.NeModel===undefined || this.NeModel.length<=0)
		throw "NE XML Filename is not valid";
	// NetconfPort: valid Port
	if(this.NetconfPort<=0 || this.NetconfPort>65535)
		throw "Netconf Port is not valid";

	return true;
}
function MediatorServer(url) {
	this._root = url;
	// if(this._root.endsWith("/"))
	this._root = this._root + "/";
	this._mediatorConfigs = [];
	this._neXMLFilenames = undefined;
	this.defaultODLConfig = {Server:"sendateodl5.fritz.box",Port:8181,User:"admin",Password:"admin"};

}
MediatorServer.prototype.getConfigs = function(){return this._mediatorConfigs;}

MediatorServer.prototype.SetDefaultODLConfig = function(cfg)
{
	this.defaultODLConfig = cfg;
}
MediatorServer.prototype.refreshConfig = function(configs,cb)
{
	var changed = [];
	if(this._mediatorConfigs===undefined)
	{
		if(cb!==undefined)
			cb(changed);
		return;
	}
	if(configs!==undefined && configs.length>0)
	{
		var i,j;
		for(i=0;i<configs.length;i++)
		{
			//find config in array by name
			for(j=0;j<this._mediatorConfigs.length;j++)
			{
				if(this._mediatorConfigs[j].Name==configs[i].Name)
				{
					//refresh data
					this._mediatorConfigs[j].refreshData(configs[i]);
					changed.push(configs[i]);
					break;
				}
			}
		}
	}
	if(cb!==undefined)
		cb(changed);
}
MediatorServer.prototype.onConfigsReceived = function(configJSONArray) {
	this._mediatorConfigs = [];
	for (var i = 0; i < configJSONArray.length; i++) {
		var c = new MediatorConfig(configJSONArray[i]);
		this._mediatorConfigs.push(c);
	}
}
MediatorServer.prototype.onNeXMLReceived = function(neXMLFilenamesArray) {
	this._neXMLFilenames = neXMLFilenamesArray;
}

MediatorServer.prototype.LoadNetworkElementXMLFiles = function(cb,cbError) {
	var _self = this;
	this.post("getnemodels", function(response) {
		if (response.code == 1) {
			_self.onNeXMLReceived(response.data);
			if (cb !== undefined)
				cb(_self._neXMLFilenames);
		} else
			_self.log(response.data);
			if(cbError!==undefined)
				cbError(response.data);

	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
MediatorServer.prototype.StartMediator = function(name, cb, cbError) {
	var _self = this;
	this.post("start",{name:name}, function(response) {
		if (response.code == 1) {
			if (cb !== undefined)
				cb(response.data);
		} else {
			_self.log(response.data);
			if(cbError!==undefined)
				cbError(response.data);
		}
	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
MediatorServer.prototype.StopMediator = function(name, cb, cbError) {
	var _self = this;
	this.post("stop",{name:name}, function(response) {
		if (response.code == 1) {
			if (cb !== undefined)
				cb(response.data);
		} else {
			_self.log(response.data);
			if(cbError!==undefined)
				cbError(response.data);
		}
	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
MediatorServer.prototype.ReloadConfig = function(name,cb,cbError)
{
	var _self = this;
	this.post("getconfig",{name:name},function(response){
		if (response.code == 1) {
			_self.refreshConfig(response.data,function(changes){
				if (cb !== undefined)
					cb(changes);
			});
		} else {
			_self.log(response.data);
			if(cbError!==undefined)
				cbError(response.data);
		}

	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});

}
MediatorServer.prototype.LoadConfigs = function(cb,cbError) {
	var _self = this;
	this.post("getconfig", function(response) {
		if (response.code == 1) {
			_self.onConfigsReceived(response.data);
			if (cb !== undefined)
				cb(_self._mediatorConfigs);
		} else {
			_self.log(response.data);
		}

	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
/*
 * name: <String> deviceType: <int> deviceip: <Ipv4-String> trapsPort:<int>
 * nexml:<String> ncport:<int> cb: callback-function
 */
MediatorServer.prototype.CreateMediator = function(name,devicetype,deviceip,trapsPort,nexml,ncport, cb, cbError) {

	var obj;
	try
	{
		obj=new MediatorConfig({
			Name:name,
			DeviceType:devicetype,
			DeviceIp:deviceip,
			TrapPort:trapsPort,
			NeXMLFile:nexml,
			NcPort:ncport
		});
		obj.TestParams();
	}
	catch(e)
	{
		if(cbError!==undefined)
			cbError(e);
	}
	this.post("create", {
		config : JSON.stringify({
			Name : obj.Name,
			DeviceType : obj.DeviceType,
			DeviceIp : obj.DeviceIp,
			TrapPort : obj.TrapsPort,
			NeXMLFile : obj.NeModel,
			NcPort : obj.NetconfPort,
			ODLConfig:[this.defaultODLConfig]
		})
	}, function(response) {
		if(response.code==1)
		{
			if(cb!==undefined)
				cb(true)
		}
		else
		{
			if(cbError!==undefined)
				cbError(response.data);
		}
	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
MediatorServer.prototype.DeleteMediator = function(name, cb, cbError)
{
	var _self = this;
	this.post('delete', {name:name}, function(response){
		if(response.code==1)
		{
			if(cb!==undefined)
				cb(true);
		}
		else
		{
			if(cb!==undefined)
				cb(response.data);
		}

	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
MediatorServer.prototype.ClearLock = function(name, cb, cbError) {
	var _self = this;
	this.post("clearlock", {
		name : name
	}, function(response) {
		if (response.code == 1) {
			if (cb !== undefined)
				cb(true);
		} else {
			_self.log(response.data);
			if (cbError !== undefined)
				cbError(response.data);
		}
	},function(err){
		if(cbError!==undefined)
			cbError(err);
	});
}
/*
 * do post request
 *
 * @params task
 */
MediatorServer.prototype.post = function(task, data, callback,callbackError) {
	var _self = this;
	if (typeof (data) === "function")
	{
		callbackError = callback;
		callback = data;
	}
	var cb=function(r) {
				if (callback !== undefined) {
					try {
						if (typeof (r) === "string")
							r = JSON.parse(r);
						callback(r);
					} catch (e) {
						_self.log(e);
						if(callbackError!==undefined)
							callbackError(e);
					}
				}
			};

	if(this.usejQueryv3)
	{
		$.post({
			url : this._root + "api/?task=" + task,
			data : data,
			success : cb
		});
	}
	else //jquery 1.x
	{
		if(typeof(data)=== "function")
		{
			$.post(this._root + "api/?task=" + task,cb).done(function() {
				_self.log( "second success" );
			  })
			  .fail(function(e) {
				  _self.log( "error" +e);
				  if(callbackError!==undefined)
					  callbackError(e);
			  })
			  .always(function() {
				  _self.log( "finished" );
			  });
		}
		else
		{
			$.post(this._root + "api/?task=" + task,data,cb).done(function() {
				_self.log( "second success" );
			  })
			  .fail(function(e) {
				  _self.log( "error" +e);
				  if(callbackError!==undefined)
					  callbackError(e);
			  })
			  .always(function() {
				  _self.log( "finished" );
			  });
		}
	}
}

MediatorServer.prototype._error = function(message) {
	console.log(message);
}
MediatorServer.prototype.log = function(message) {
	console.log(message);
}