<script lang="ts" setup>
import { ReservationSeatsType } from "~/components/home/reservations/types";

const mockData: ExtendedBus = {
	busId: "689c63a690c273c3cb4fc25c",
	name: "Veliki bus",
	registration: "NS-842-IG",
	reservationSeatsRows: [
		{
			reservationSlots: null,
			dividerText: "I",
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Zlatko",
						lastName: "Markovic",
						phone: "0214892606",
					},
					number: 1,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 2,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 3,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Pavle",
						lastName: "Jovanović",
						phone: "062775688",
					},
					number: 4,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 5,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 6,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Ana",
						lastName: "Velimirović",
						phone: "0631682791",
					},
					number: 7,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Ana",
						lastName: "Velimirović",
						phone: "0631682791",
					},
					number: 8,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Zlatko",
						lastName: "Markovic",
						phone: "0214892606",
					},
					number: 9,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 10,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Ana",
						lastName: "Velimirović",
						phone: "0631682791",
					},
					number: 11,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Ana",
						lastName: "Velimirović",
						phone: "0631682791",
					},
					number: 12,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Zlatko",
						lastName: "Markovic",
						phone: "0214892606",
					},
					number: 13,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 14,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 15,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 16,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 17,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 18,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 19,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 20,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 21,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Ana",
						lastName: "Velimirović",
						phone: "0631682791",
					},
					number: 22,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 23,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 24,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 25,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 26,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 27,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 28,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 29,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 30,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Zlatko",
						lastName: "Markovic",
						phone: "0214892606",
					},
					number: 31,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 32,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 33,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 34,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.STAIRS,
				},
				{
					type: ReservationSeatsType.STAIRS,
				},
			],
		},
		{
			reservationSlots: null,
			dividerText: "II",
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 35,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 36,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 37,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 38,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 39,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 40,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 41,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 42,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 43,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 44,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 45,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 46,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 47,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 48,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 49,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 50,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 51,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 52,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 53,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 54,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Pavle",
						lastName: "Jovanović",
						phone: "062775688",
					},
					number: 55,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 56,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 57,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 58,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 59,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 60,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 61,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 62,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 63,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 64,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 65,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 66,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 67,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 68,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Pavle",
						lastName: "Jovanović",
						phone: "062775688",
					},
					number: 69,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 70,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 71,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 72,
				},
				{
					type: ReservationSeatsType.NOT,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Pavle",
						lastName: "Jovanović",
						phone: "062775688",
					},
					number: 73,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 74,
				},
			],
		},
		{
			reservationSlots: [
				{
					type: ReservationSeatsType.FREE,
					number: 75,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 76,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Pavle",
						lastName: "Jovanović",
						phone: "062775688",
					},
					number: 77,
				},
				{
					type: ReservationSeatsType.OCCUPIED,
					reservationData: {
						userId: "689c62ef90c273c3cb4fc257",
						name: "Pavle",
						lastName: "Jovanović",
						phone: "062775688",
					},
					number: 78,
				},
				{
					type: ReservationSeatsType.FREE,
					number: 79,
				},
			],
		},
	],
	busNumber: 2,
	freeSeats: 64,
	totalSeats: 79,
};
</script>

<template>
	<div class="container my-10">
		<AdminDashboardPrintLayout :bus="mockData" />
	</div>
</template>
