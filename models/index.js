import {Request} from '../utils/request.js'

class IndexModel extends Request{
	getIndexArticleList(magazineId=0,count=0){
		return this.getData(`/getIndexArticleList/${magazineId}/${count}`);
	}
	
	getMarkTypeList(magazineId=0){
		return this.getData(`/getMarkTypeList/${magazineId}`);
	}
	
	getRecommendInfo(magazineId=0){
		return this.getData(`/getRecommendInfo/${magazineId}`);
	}
}


export {IndexModel}