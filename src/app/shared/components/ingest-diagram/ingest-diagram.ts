import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

const K = 'SHOWCASE.STADTPULS.EVIDENCE.';

@Component({
  selector: 'app-ingest-diagram',
  imports: [TranslateModule],
  templateUrl: './ingest-diagram.html',
  styleUrl: './ingest-diagram.scss',
})
/**
 * StadtPuls ingest path as plain HTML boxes (no image, so it follows the
 * colour tokens and reflows on small screens). The two data stores sit
 * side by side in one step. Screen readers get the whole flow as one label.
 */
export class IngestDiagram {
  protected readonly k = K;
  protected readonly steps = [
    [{ name: 'D_DEVICE', sub: 'D_DEVICE_SUB' }],
    [{ name: 'D_QUEUE', sub: 'D_QUEUE_SUB' }],
    [{ name: 'D_SERVICES', sub: 'D_SERVICES_SUB' }],
    [
      { name: 'D_PG', sub: 'D_PG_SUB' },
      { name: 'D_INFLUX', sub: 'D_INFLUX_SUB' },
    ],
    [{ name: 'D_UI', sub: 'D_UI_SUB' }],
  ];
}
