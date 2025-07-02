import { Type, type SeatRow } from "~/components/buses/types";
import type { ReservationSlot } from "~/components/home/reservations/types";

export const isSelected = (seat: ReservationSlot, selectedSeats: number[]) => {
	if (seat.type !== "FREE") return false;

	return selectedSeats.includes(seat.number);
};

export const isDisabled = (seat: ReservationSlot, maxSeatsReached: boolean, selectedSeats: number[]) => {
	if (seat.type !== "FREE") return true;

	return maxSeatsReached && !isSelected(seat, selectedSeats);
};

export const createDevider = (deviderText: string) => {
	return {
		slots: [],
		deviderText,
	};
};

export const handleUpdateDevider = (rows: SeatRow[], deviderText: string, options?: { firstRow: boolean }) => {
	const deviderSlot = createDevider(deviderText);

	if (options?.firstRow) {
		rows.unshift(deviderSlot);
		return;
	}

	rows.push(deviderSlot);
};

const createRow = (seatsPerRow = 5) => ({
	slots: Array.from({ length: seatsPerRow }, () => ({
		type: Type.FREE,
		number: 1,
	})),
});

export const handleUpdateTotalRows = (rows: SeatRow[], value: number) => {
	const currentRowCount = rows.length;

	if (value < currentRowCount) {
		rows.splice(value);
		renumberSeats(rows);

		return;
	}

	if (value > currentRowCount) {
		const newRows = Array.from({ length: value - currentRowCount }, () => createRow());
		rows.push(...newRows);

		renumberSeats(rows);
	}
};

export const handleUpdateType = (rows: SeatRow[], type: Type, rowIndex: number, seatIndex: number) => {
	const row = rows[rowIndex];
	if (row && row.slots[seatIndex]) {
		row.slots[seatIndex].type = type;

		renumberSeats(rows);
	}
};

export const renumberSeats = (rows: SeatRow[]) => {
	let seatNumber = 1;

	rows.forEach((row) => {
		row.slots.forEach((seat) => {
			if (seat.type === Type.FREE) {
				seat.number = seatNumber++;
			}
			else {
				delete seat.number;
			}
		});
	});
};
