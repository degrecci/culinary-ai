async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require("./browser");
    worker.start();
  }
}

initMocks();

export {};
