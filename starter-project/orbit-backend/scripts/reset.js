// Restores data/ from seed/. Run before each recording or whenever you want a clean slate.
import { resetData, DATA_DIR } from "../store.js";
resetData();
console.log(`Orbit Labs data reset. Fresh copy written to ${DATA_DIR}`);
