import crypto from 'crypto';

export async function hashAndHex(input: string): Promise<string> {
  const algo = 'sha256';
  const hash = crypto.createHash(algo);
  hash.update(input);
  const raw = hash.digest();
  return raw.toString('hex');
}

export async function hexFullPath(path: string, fileName: string): Promise<string> {
  const fullPath = `${path}${fileName}`;
  return await hashAndHex(fullPath);
}

/**
 * Create a Merkle Hex string from a directory path.
 * @param {string} path - Directory path as delimited by slashes "/".
 * @returns {Promise<string>} - Resulting Merkle Hex string.
 * @private
 */
export async function merkleMeBro(path: string): Promise<string> {
  const pathArray = path.split('/');
  let merkle = '';
  for (let i = 0; i < pathArray.length; i++) {
    merkle = await hexFullPath(merkle, pathArray[i]);
  }
  return merkle;
}

export async function makeEditorsMap(editor: string): Promise<string> {
    const editors: { [key: string]: string } = {};

    const trackingNumber = 1;

    // This root folder is the master root and has no file key, so there is nothing to encrypt.
    // We include the creator of this root as an editor so that they can add children--folders or files

    const h = crypto.createHash('sha256');
    h.update(Buffer.from(`e${trackingNumber}${editor}`));
    const hash = h.digest();

    const addressString = hash.toString('hex');

    editors[addressString] = Buffer.from('Placeholder key').toString('hex');

    const jsonEditors = JSON.stringify(editors);

    return jsonEditors;
}

// An exact ts implementation of the canine-chain's MerklePath function
export async function MerklePath(path: string): Promise<string> {
  // If the end of the path has a slash, e.g., "hello/world/path/", splitting would create an array with an empty string at the end
  // Removing the trailing '/' to ensure compatibility
  const trimPath = path.replace(/\/$/, '');
  const chunks = trimPath.split('/');

  let total = '';

  for (const chunk of chunks) {
    const h = crypto.createHash('sha256');
    h.update(chunk);
    const b = h.digest('hex');
    const k = total + b;

    const h1 = crypto.createHash('sha256');
    h1.update(k);
    total = h1.digest('hex');
  }

  return total;
}