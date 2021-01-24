export default interface IHashProvider {
  generateHash(payoad: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
