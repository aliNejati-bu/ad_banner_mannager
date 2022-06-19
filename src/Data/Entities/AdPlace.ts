export class AdPlace {
    constructor(
        public _id: string,
        public name: string,
        public status: "active" | "inactive" | "hybrid",
        public banner: string | null,
        public createdAt: Date,
        public updatedAt: Date,
        public gameId: string
    ) {
    }
}