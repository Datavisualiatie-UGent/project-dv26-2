/**
 * Creates a dedicated left-hand panel containing a flag image and country text.
 * Requires an explicit width to prevent hconcat layout engine crashes.
 */
function createFlagPanel(vlInstance, {
    yField = 'country_label',
    labelField = 'country_label',
    flagField = 'flag_url',
    imageWidth = 24,
    imageHeight = 16,
    width = 140
} = {}) {
    // Text is anchored to the right side of this panel
    const txt = vlInstance.markText({ align: 'right', dx: -35 })
        .encode(
            vlInstance.x().value(width),
            vlInstance.y().fieldN(yField).sort({ field: 'country_order', op: 'min' }).axis(null),
            vlInstance.text().fieldN(labelField)
        );

    // Image is anchored right next to the text
    const img = vlInstance.markImage({ width: imageWidth, height: imageHeight, align: 'left', dx: -30 })
        .encode(
            vlInstance.x().value(width),
            vlInstance.y().fieldN(yField).sort({ field: 'country_order', op: 'min' }).axis(null),
            vlInstance.url().field(flagField)
        );

    // A single layered panel with an explicit width
    return vlInstance.layer(txt, img).width(width);
}

/**
 * Create a small title-only panel that can be placed to the left of a visualization.
 * Useful when composing a dedicated title/label column so other panels don't need to
 * position their text or flags.
 */
function createTitlePanel(vlInstance, {
    titleText = '',
    width = 60,
    height = undefined,
    align = 'left',
    fontSize = 12
} = {}) {
    const txt = vlInstance.markText({ align, fontSize }).encode(
        vlInstance.text().value(titleText)
    );

    let panel = txt.width(width);
    if (height) panel = panel.height(height);
    return panel;
}

/**
 * Create an overlay layer that pins flag images and country labels using absolute
 * x positions (pixel values) while using the band's y scale to align with rows.
 * This avoids hconcat and prevents the layout solver from waiting on image loads.
 */
function createFlagOverlay(vlInstance, {
    yField = 'country_label',
    labelField = 'country_label',
    flagField = 'flag_url',
    imageWidth = 20,
    imageHeight = 12,
    imageX = 8,
    textX = -8,
    textAlign = 'right'
} = {}) {
    // Image positioned at a fixed pixel x; y uses the band for rows so flags sit
    // beside each country row without participating in the quantitative x-scale.
    const img = vlInstance.markImage({ width: imageWidth, height: imageHeight })
        .encode(
            vlInstance.x().value(imageX),
            vlInstance.y().fieldN(yField).sort({ field: 'country_order', op: 'min' }),
            vlInstance.url().field(flagField)
        );

    const txt = vlInstance.markText({ align: textAlign })
        .encode(
            vlInstance.x().value(textX),
            vlInstance.y().fieldN(yField).sort({ field: 'country_order', op: 'min' }),
            vlInstance.text().fieldN(labelField)
        );

    return vlInstance.layer(img, txt);
}

/**
 * Creates a dynamic header/legend for Radar and Line plots.
 * It filters the dataset for the selected countries and draws their flags.
 */
function createDynamicLegend(vlInstance, { width = 300 } = {}) {
    // Render the flag image
    const flags = vlInstance.markImage({ width: 24, height: 16, align: 'center' })
        .encode(
            vlInstance.x().fieldQ('country_order').scale({ domain: [1, 2], range: [width * 0.2, width * 0.8] }).axis(null),
            vlInstance.y().value(0),
            vlInstance.url().field('flag_url')
        );

    // Render the country name colored to match the chart lines
    const names = vlInstance.markText({ align: 'left', dx: 15, fontSize: 13, fontWeight: 'bold' })
        .encode(
            vlInstance.x().fieldQ('country_order').scale({ domain: [1, 2], range: [width * 0.2, width * 0.8] }),
            vlInstance.y().value(0),
            vlInstance.text().fieldN('country_label'),
            vlInstance.color().fieldN('country_label').scale({ range: ["#1f77b4", "#ff7f0e"] }).legend(null) // Hides default legend
        );

    return vlInstance.layer(flags, names)
        .height(30).width(width)
        .transform(
            // Listen to the dropdown parameters
            vlInstance.filter('datum.country_label === country_a || datum.country_label === country_b'),
            vlInstance.calculate("datum.country_label === country_a ? 1 : 2").as('country_order'),
            // Deduplicate so we only draw one flag per country
            vlInstance.aggregate(vlInstance.groupby('country_label', 'country_order', 'flag_url'))
        );
}

module.exports = { createFlagPanel, createTitlePanel, createFlagOverlay, createDynamicLegend };
