import fixText from "./fixtext";

const product = async (query) => {
    const product_page = await (
        await fetch(`https://www.amazon.it/dp/${query}`)
    ).text();
    let price = null;
    let priceDiv = product_page.split(/<div id="corePriceDisplay_desktop_feature_div".*>/g);
    try {
        price = priceDiv[0]
            .split('<span class="a-offscreen">')[1]
            .split("</span>")[0];
    } catch (pe) {
    }
    try {
        var name = fixText(
            product_page
                .split(
                    '<span id="productTitle" class="a-size-large product-title-word-break">'
                )[1]
                .split("</span>")[0]);
        var image = product_page
            .split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1]
            .split('data-old-hires="')[1]
            .split('"')[0]
            .replaceAll("\n", "");
        if (image === "") {
            var image = product_page
                .split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1]
                .split('data-a-dynamic-image="{&quot;')[1]
                .split("&quot;")[0]
                .replaceAll("\n", "");
        }
        var all_product = product_page.split(
            '<div class="sponsored-products-truncator-truncate">'
        );
        var i,
            result = [];
        var dio = all_product.length

    } catch (e) {
        var image = null;
    }

    return JSON.stringify(
        {
            status: true,
            query,
            name,
            image,
            price,
            product_link: `https://www.amazon.it/dp/${query}/?&tag=angelblack199-21`,
        },
        null,
        2
    );
};

export default product;
