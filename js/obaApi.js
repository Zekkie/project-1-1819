class ObaApi extends XMLHttpRequest{

  constructor() {
    super();
  
    this.url = {};
  }

  promise() {
    return new Promise((resolve, reject) => {
      this.onload = (r) => {

        if(r.target.status >= 200 && r.target.status < 400) {
          resolve(r.target.response);
        }else {
          reject(r.target.status)
        }
      }

      this.onerror = function(e) {
        reject(e)
      }
    }) 
  }

  xml2json(srcDOM) {
      let children = [...srcDOM.children];

      if (!children.length) {
        return srcDOM.innerHTML
      }     
      let jsonResult = {};
      for (let child of children) {

  
        let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;
        if (childIsArray) {
          if (jsonResult[child.nodeName] === undefined) {
            jsonResult[child.nodeName] = [this.xml2json(child)];
          } else {
            jsonResult[child.nodeName].push(this.xml2json(child));
          }
        } else {
          jsonResult[child.nodeName] = this.xml2json(child);
        }
      }

      return jsonResult;
    
  }

  obliviateXml(xml) {
      const treeParser = new DOMParser();
      const vomit = treeParser.parseFromString(xml, "application/xml");
      const barf = vomit.querySelector("results");
      return this.xml2json(barf);
  }

   then(succes,fail) {
     return this.promise().then(succes,fail);
   }

    catch(fail) {
      return this.promise().then(fail);
   }
   
   find(q) {
     this.open("get", "http://localhost:3000/"+q, true);
     this.send();

     return this.then(res => {
        return this.obliviateXml(res);
     })
   }
}


export default ObaApi;