export default async function searchProducts(query, host) {
    const searchQuery = query.replace(/%20/gi, "+");
    const searchRes = await (
        await fetch(`https://www.amazon.it/s?k=${searchQuery}`)
    ).text();
    var all_product = searchRes.split(
        '<div class="a-section a-spacing-base">'
    );
    var dan = "test"
    console.log("all_product", all_product.length)
    console.log("all_product",all_product)
    var i,
        result = [];
    all_product = searchRes.split(
        '<div class="a-section a-spacing-base">'
    );
    for (i = 1; i < all_product.length; i++) {
        try {
            var product_link =
                "https://www.amazon.it" +
                all_product[i]
                    .split(
                        '<a class="a-link-normal s-no-outline" href="'
                    )[1]
                    .split('"')[0];
            if (!product_link.includes("spons")) {
                result.push({
                    name:
                        all_product[i]
                            .split(
                                '<span class="a-size-base-plus a-color-base a-text-normal">'
                            )[1]
                            .split("</span>")[0],
                    image: all_product[i]
                        .split('src="')[1]
                        .split('"')[0]
                        .replace("_AC_UL320_.jpg", "_SL1000_.jpg"),
                    price:
                        all_product[i]
                            .split(
                                '<span class="a-price-whole">'
                            )[1]
                            .split("</span>")[0],
                    product_link
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    return JSON.stringify(
        {
            status: true,
            total_result: result.length,
            query: searchQuery,
            fetch_from: `https://www.amazon.it/s?k=${searchQuery}`,
            result,
            dan
        },
        null,
        2
    );
}
