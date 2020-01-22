var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyHJOCbsZJ0jQXAj'}).base('appGfmFIRAf5WZjjt');

base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 4,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    var veilleList = ''
    records.forEach(function(record, index) {
        console.log(record.get('Field 7')[index])
        var veille = `
        <div>
        <p>${record.get('DATE')}</p>
        <div class="image-container" style="background-image: url('${record.get('Field 7')[0].url}');"></div>

            <p>${record.get('Sujet')}</p>
            <p>${record.get('Synthèse')}</p>
        </div>`
        veilleList += veille
    });
    $('#veille-container').html(veilleList)

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});