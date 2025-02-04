const config = {
	baseUrl: 'https://api.github.com',
	itemsPerPage: 10,
	username: 'kripple',
} as const;

export const endpoints = {
	avatar: ({ id }: { id: number }) => `https://avatars.githubusercontent.com/u/${id}`,
	repos: ({ page }: { page: number }) =>
		`${config.baseUrl}/users/${config.username}/repos?per_page=${config.itemsPerPage}&page=${page}&type=public&sort=updated`,
	languages: ({ repo }: { repo: string }) => `${config.baseUrl}/repos/${config.username}/${repo}/languages`,
	profile: () => `${config.baseUrl}/users/${config.username}`,
};
