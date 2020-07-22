export getStatus(navItem){
	if(navItem.loadingStatus || navItem.loadingType){
		return "loading";
	} else if (navItem.hasMore){
		return "more";
	} else {
		return "noMore";
	}
}