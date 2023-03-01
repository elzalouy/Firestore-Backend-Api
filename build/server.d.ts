/// <reference types="node" />
declare const server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
export declare const FireStore: FirebaseFirestore.Firestore | null;
export default server;
