const downloadFileFromUrl = require('./downloadFileFromUrl');
const jsonToQueryString = require('./jsonToQueryString');
const currentDateString = require('./currentDateString');

const fredCsvUrl = "https://fred.stlouisfed.org/graph/fredgraph.csv";
const queryPayload = {
  "bgcolor": "#e1e9f0",
  "chart_type": "line",
  "drp": "0",
  "fo": "open sans",
  "graph_bgcolor": "#ffffff",
  "height": "450",
  "mode": "fred",
  "recession_bars": "on",
  "txtcolor": "#444444",
  "ts": "12",
  "tts": "12",
  "width": "1318",
  "nt": "0",
  "thu": "0",
  "trc": "0",
  "show_legend": "yes",
  "show_axis_titles": "yes",
  "show_tooltip": "yes",
  "id": "RRPONTSYD",
  "scale": "left",
  "cosd": "2003-02-07",
  "coed": currentDateString(),
  "line_color": "#4572a7",
  "link_values": "false",
  "line_style": "solid",
  "mark_type": "none",
  "mw": "3",
  "lw": "2",
  "ost": "-99999",
  "oet": "99999",
  "mma": "0",
  "fml": "a",
  "fq": "Daily",
  "fam": "avg",
  "fgst": "lin",
  "fgsnd": "2020-02-01",
  "line_index": "1",
  "transformation": "lin",
  "vintage_date": currentDateString(),
  "revision_date": currentDateString(),
  "nd": "2003-02-07"
};

const main = async (filename) => {
	let _fredCsvUrl = `${fredCsvUrl}?${ jsonToQueryString(queryPayload) }`;
  await downloadFileFromUrl(_fredCsvUrl, filename);
}

module.exports = main;